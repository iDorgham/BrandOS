-- DNA Version Control & History Migration
-- Adds comprehensive versioning capabilities to Brand OS
-- Migration: 20240205_dna_versioning.sql

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- DNA Versions Table
CREATE TABLE IF NOT EXISTS dna_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    version VARCHAR(20) NOT NULL, -- Semantic versioning: "1.0.0"
    name VARCHAR(255) NOT NULL,
    description TEXT,
    changes JSONB NOT NULL DEFAULT '[]', -- Array of change objects
    created_by UUID NOT NULL REFERENCES auth.users(id),
    created_at BIGINT NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT false,
    is_branch BOOLEAN NOT NULL DEFAULT false,
    parent_version_id UUID REFERENCES dna_versions(id),
    branch_name VARCHAR(100),
    metadata JSONB NOT NULL DEFAULT '{
        "change_summary": "",
        "breaking_changes": false,
        "migration_required": false,
        "affected_assets": 0
    }',
    
    -- Constraints
    CONSTRAINT unique_current_version_per_brand UNIQUE (brand_id, is_current) DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT unique_version_per_brand UNIQUE (brand_id, version)
);

-- DNA Branches Table
CREATE TABLE IF NOT EXISTS dna_branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_version_id UUID NOT NULL REFERENCES dna_versions(id),
    head_version_id UUID NOT NULL REFERENCES dna_versions(id),
    created_by UUID NOT NULL REFERENCES auth.users(id),
    created_at BIGINT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    purpose VARCHAR(20) NOT NULL CHECK (purpose IN ('experiment', 'campaign', 'seasonal', 'testing')),
    metadata JSONB NOT NULL DEFAULT '{
        "compliance_status": "pending",
        "expected_merge_date": null,
        "test_results": []
    }',
    
    -- Constraints
    CONSTRAINT unique_branch_name_per_brand UNIQUE (brand_id, name)
);

-- DNA Merges Table
CREATE TABLE IF NOT EXISTS dna_merges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    source_branch_id UUID REFERENCES dna_branches(id) ON DELETE SET NULL,
    target_version_id UUID NOT NULL REFERENCES dna_versions(id),
    merged_by UUID NOT NULL REFERENCES auth.users(id),
    merged_at BIGINT NOT NULL,
    conflict_resolution JSONB,
    changes_merged JSONB NOT NULL DEFAULT '[]',
    metadata JSONB NOT NULL DEFAULT '{
        "merge_type": "merge_commit",
        "conflicts_resolved": 0
    }'
);

-- DNA Version Rollbacks Table
CREATE TABLE IF NOT EXISTS dna_version_rollbacks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    version_id UUID NOT NULL REFERENCES dna_versions(id),
    reason TEXT NOT NULL,
    rollback_by UUID NOT NULL REFERENCES auth.users(id),
    rollback_at BIGINT NOT NULL,
    affected_assets JSONB NOT NULL DEFAULT '[]',
    backup_created BOOLEAN NOT NULL DEFAULT false
);

-- DNA Version Analytics Table
CREATE TABLE IF NOT EXISTS dna_version_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version_id UUID NOT NULL REFERENCES dna_versions(id) ON DELETE CASCADE,
    usage JSONB NOT NULL DEFAULT '{
        "asset_generations": 0,
        "user_adoption": 0,
        "performance_score": 0
    }',
    quality JSONB NOT NULL DEFAULT '{
        "average_compliance_score": 0,
        "user_rating": 0,
        "bug_reports": 0
    }',
    insights JSONB NOT NULL DEFAULT '{
        "strength_score": 0,
        "recommended_improvements": [],
        "performance_trend": "stable"
    }',
    calculated_at BIGINT NOT NULL,
    
    -- Constraints
    CONSTRAINT unique_analytics_per_version UNIQUE (version_id)
);

-- DNA Export History Table
CREATE TABLE IF NOT EXISTS dna_export_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version_id UUID NOT NULL REFERENCES dna_versions(id),
    exported_by UUID NOT NULL REFERENCES auth.users(id),
    export_config JSONB NOT NULL,
    file_path VARCHAR(500),
    file_size BIGINT,
    exported_at BIGINT NOT NULL,
    download_count INTEGER NOT NULL DEFAULT 0
);

-- DNA Version Comments Table (for collaboration)
CREATE TABLE IF NOT EXISTS dna_version_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version_id UUID NOT NULL REFERENCES dna_versions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    content TEXT NOT NULL,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL,
    parent_comment_id UUID REFERENCES dna_version_comments(id) ON DELETE CASCADE,
    
    -- Constraints
    FOREIGN KEY (parent_comment_id) REFERENCES dna_version_comments(id)
);

-- DNA Version Test Results Table
CREATE TABLE IF NOT EXISTS dna_version_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version_id UUID NOT NULL REFERENCES dna_versions(id) ON DELETE CASCADE,
    test_type VARCHAR(50) NOT NULL CHECK (test_type IN ('compliance', 'performance', 'user_testing', 'ai_generation')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('passed', 'failed', 'warning', 'pending')),
    score NUMERIC(3,2), -- 0.00 to 99.99
    details TEXT,
    test_data JSONB,
    tested_by UUID NOT NULL REFERENCES auth.users(id),
    tested_at BIGINT NOT NULL,
    
    -- Constraints
    CONSTRAINT valid_score_range CHECK (score >= 0 AND score <= 100)
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_dna_versions_brand_id ON dna_versions(brand_id);
CREATE INDEX IF NOT EXISTS idx_dna_versions_created_at ON dna_versions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dna_versions_current ON dna_versions(is_current) WHERE is_current = true;
CREATE INDEX IF NOT EXISTS idx_dna_versions_version ON dna_versions(brand_id, version);

CREATE INDEX IF NOT EXISTS idx_dna_branches_brand_id ON dna_branches(brand_id);
CREATE INDEX IF NOT EXISTS idx_dna_branches_active ON dna_branches(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_dna_branches_purpose ON dna_branches(purpose);

CREATE INDEX IF NOT EXISTS idx_dna_merges_brand_id ON dna_merges(brand_id);
CREATE INDEX IF NOT EXISTS idx_dna_merges_merged_at ON dna_merges(merged_at DESC);

CREATE INDEX IF NOT EXISTS idx_dna_version_analytics_version_id ON dna_version_analytics(version_id);
CREATE INDEX IF NOT EXISTS idx_dna_version_analytics_calculated_at ON dna_version_analytics(calculated_at DESC);

CREATE INDEX IF NOT EXISTS idx_dna_export_history_version_id ON dna_export_history(version_id);
CREATE INDEX IF NOT EXISTS idx_dna_export_history_exported_at ON dna_export_history(exported_at DESC);

CREATE INDEX IF NOT EXISTS idx_dna_version_comments_version_id ON dna_version_comments(version_id);
CREATE INDEX IF NOT EXISTS idx_dna_version_comments_created_at ON dna_version_comments(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_dna_version_tests_version_id ON dna_version_tests(version_id);
CREATE INDEX IF NOT EXISTS idx_dna_version_tests_test_type ON dna_version_tests(test_type);
CREATE INDEX IF NOT EXISTS idx_dna_version_tests_status ON dna_version_tests(status);

-- Row Level Security (RLS)
ALTER TABLE dna_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dna_branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE dna_merges ENABLE ROW LEVEL SECURITY;
ALTER TABLE dna_version_rollbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE dna_version_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE dna_export_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE dna_version_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE dna_version_tests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for dna_versions
CREATE POLICY "Users can view dna_versions for their workspaces" ON dna_versions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM brands b 
            WHERE b.id = dna_versions.brand_id 
            AND b.workspace_id IN (
                SELECT workspace_id FROM workspace_members 
                WHERE user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Users can create dna_versions for their workspaces" ON dna_versions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM brands b 
            WHERE b.id = dna_versions.brand_id 
            AND b.workspace_id IN (
                SELECT workspace_id FROM workspace_members 
                WHERE user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Users can update dna_versions for their workspaces" ON dna_versions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM brands b 
            WHERE b.id = dna_versions.brand_id 
            AND b.workspace_id IN (
                SELECT workspace_id FROM workspace_members 
                WHERE user_id = auth.uid()
            )
        )
    );

-- RLS Policies for dna_branches
CREATE POLICY "Users can view dna_branches for their workspaces" ON dna_branches
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM brands b 
            WHERE b.id = dna_branches.brand_id 
            AND b.workspace_id IN (
                SELECT workspace_id FROM workspace_members 
                WHERE user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Users can manage dna_branches for their workspaces" ON dna_branches
    FOR ALL WITH CHECK (
        EXISTS (
            SELECT 1 FROM brands b 
            WHERE b.id = dna_branches.brand_id 
            AND b.workspace_id IN (
                SELECT workspace_id FROM workspace_members 
                WHERE user_id = auth.uid()
            )
        )
    );

-- RLS Policies for other tables (similar patterns)
CREATE POLICY "Users can manage dna_merges for their workspaces" ON dna_merges
    FOR ALL WITH CHECK (
        EXISTS (
            SELECT 1 FROM brands b 
            WHERE b.id = dna_merges.brand_id 
            AND b.workspace_id IN (
                SELECT workspace_id FROM workspace_members 
                WHERE user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Users can manage dna_version_rollbacks for their workspaces" ON dna_version_rollbacks
    FOR ALL WITH CHECK (
        EXISTS (
            SELECT 1 FROM brands b 
            WHERE b.id = dna_version_rollbacks.brand_id 
            AND b.workspace_id IN (
                SELECT workspace_id FROM workspace_members 
                WHERE user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Users can manage dna_version_analytics for their workspaces" ON dna_version_analytics
    FOR ALL WITH CHECK (
        EXISTS (
            SELECT 1 FROM dna_versions dv 
            WHERE dv.id = dna_version_analytics.version_id 
            AND EXISTS (
                SELECT 1 FROM brands b 
                WHERE b.id = dv.brand_id 
                AND b.workspace_id IN (
                    SELECT workspace_id FROM workspace_members 
                    WHERE user_id = auth.uid()
                )
            )
        )
    );

CREATE POLICY "Users can manage dna_export_history for their workspaces" ON dna_export_history
    FOR ALL WITH CHECK (
        EXISTS (
            SELECT 1 FROM dna_versions dv 
            WHERE dv.id = dna_export_history.version_id 
            AND EXISTS (
                SELECT 1 FROM brands b 
                WHERE b.id = dv.brand_id 
                AND b.workspace_id IN (
                    SELECT workspace_id FROM workspace_members 
                    WHERE user_id = auth.uid()
                )
            )
        )
    );

CREATE POLICY "Users can manage dna_version_comments for their workspaces" ON dna_version_comments
    FOR ALL WITH CHECK (
        EXISTS (
            SELECT 1 FROM dna_versions dv 
            WHERE dv.id = dna_version_comments.version_id 
            AND EXISTS (
                SELECT 1 FROM brands b 
                WHERE b.id = dv.brand_id 
                AND b.workspace_id IN (
                    SELECT workspace_id FROM workspace_members 
                    WHERE user_id = auth.uid()
                )
            )
        )
    );

CREATE POLICY "Users can manage dna_version_tests for their workspaces" ON dna_version_tests
    FOR ALL WITH CHECK (
        EXISTS (
            SELECT 1 FROM dna_versions dv 
            WHERE dv.id = dna_version_tests.version_id 
            AND EXISTS (
                SELECT 1 FROM brands b 
                WHERE b.id = dv.brand_id 
                AND b.workspace_id IN (
                    SELECT workspace_id FROM workspace_members 
                    WHERE user_id = auth.uid()
                )
            )
        )
    );

-- Helper Functions

-- Function to calculate next version number
CREATE OR REPLACE FUNCTION calculate_next_version(p_brand_id UUID, p_base_version VARCHAR(20))
RETURNS VARCHAR(20) AS $$
DECLARE
    v_major INTEGER;
    v_minor INTEGER;
    v_patch INTEGER;
    v_next_version VARCHAR(20);
BEGIN
    -- Parse current version
    SELECT 
        SPLIT_PART(p_base_version, '.', 1)::INTEGER,
        SPLIT_PART(p_base_version, '.', 2)::INTEGER,
        SPLIT_PART(p_base_version, '.', 3)::INTEGER
    INTO v_major, v_minor, v_patch;
    
    -- Increment patch version
    v_patch := v_patch + 1;
    
    -- Handle version overflow
    IF v_patch >= 100 THEN
        v_patch := 0;
        v_minor := v_minor + 1;
        
        IF v_minor >= 100 THEN
            v_minor := 0;
            v_major := v_major + 1;
        END IF;
    END IF;
    
    v_next_version := FORMAT('%s.%s.%s', v_major, v_minor, v_patch);
    
    RETURN v_next_version;
END;
$$ LANGUAGE plpgsql;

-- Function to create automatic version snapshot
CREATE OR REPLACE FUNCTION create_version_snapshot(
    p_brand_id UUID,
    p_name VARCHAR(255),
    p_description TEXT DEFAULT NULL,
    p_user_id UUID DEFAULT auth.uid()
)
RETURNS UUID AS $$
DECLARE
    v_new_version_id UUID;
    v_current_version VARCHAR(20);
    v_next_version VARCHAR(20);
BEGIN
    -- Get current version
    SELECT version INTO v_current_version
    FROM dna_versions
    WHERE brand_id = p_brand_id AND is_current = true;
    
    -- Calculate next version
    v_next_version := calculate_next_version(p_brand_id, COALESCE(v_current_version, '0.0.0'));
    
    -- Insert new version
    INSERT INTO dna_versions (
        brand_id,
        version,
        name,
        description,
        created_by,
        created_at,
        is_current
    ) VALUES (
        p_brand_id,
        v_next_version,
        p_name,
        p_description,
        p_user_id,
        EXTRACT(EPOCH FROM NOW())::BIGINT,
        true
    ) RETURNING id INTO v_new_version_id;
    
    -- Mark previous version as not current
    UPDATE dna_versions
    SET is_current = false
    WHERE brand_id = p_brand_id AND id != v_new_version_id;
    
    RETURN v_new_version_id;
END;
$$ LANGUAGE plpgsql;

-- Function to track version analytics
CREATE OR REPLACE FUNCTION track_version_analytics(
    p_version_id UUID,
    p_usage JSONB DEFAULT '{}',
    p_quality JSONB DEFAULT '{}'
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO dna_version_analytics (
        version_id,
        usage,
        quality,
        calculated_at
    ) VALUES (
        p_version_id,
        p_usage,
        p_quality,
        EXTRACT(EPOCH FROM NOW())::BIGINT
    )
    ON CONFLICT (version_id) 
    DO UPDATE SET
        usage = dna_version_analytics.usage || p_usage,
        quality = dna_version_analytics.quality || p_quality,
        calculated_at = EXTRACT(EPOCH FROM NOW())::BIGINT;
END;
$$ LANGUAGE plpgsql;

-- Triggers

-- Trigger to update analytics when version is created
CREATE OR REPLACE FUNCTION update_version_analytics_trigger()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO dna_version_analytics (version_id, calculated_at)
    VALUES (NEW.id, EXTRACT(EPOCH FROM NOW())::BIGINT)
    ON CONFLICT (version_id) DO NOTHING;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER dna_versions_analytics_trigger
    AFTER INSERT ON dna_versions
    FOR EACH ROW
    EXECUTE FUNCTION update_version_analytics_trigger();

-- Triggers for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := EXTRACT(EPOCH FROM NOW())::BIGINT;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create updated_at trigger for dna_version_comments
ALTER TABLE dna_version_comments ADD COLUMN IF NOT EXISTS updated_at BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT);

CREATE TRIGGER dna_version_comments_updated_at
    BEFORE UPDATE ON dna_version_comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Initialize with seed data for existing brands (optional)
-- This function can be called after migration to create initial versions
CREATE OR REPLACE FUNCTION initialize_brand_versioning()
RETURNS VOID AS $$
DECLARE
    brand_record RECORD;
    v_version_id UUID;
BEGIN
    -- Loop through existing brands without versions
    FOR brand_record IN 
        SELECT id, name FROM brands b 
        WHERE NOT EXISTS (
            SELECT 1 FROM dna_versions dv 
            WHERE dv.brand_id = b.id
        )
    LOOP
        -- Create initial version
        INSERT INTO dna_versions (
            brand_id,
            version,
            name,
            description,
            created_by,
            created_at,
            is_current,
            changes,
            metadata
        ) VALUES (
            brand_record.id,
            '1.0.0',
            'Initial Version',
            'Automatically created initial version from existing brand',
            'system', -- Will be updated to actual user ID
            EXTRACT(EPOCH FROM NOW())::BIGINT,
            true,
            '[]'::JSONB,
            '{
                "change_summary": "Initial version created from existing brand data",
                "breaking_changes": false,
                "migration_required": false,
                "affected_assets": 0
            }'::JSONB
        );
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON dna_versions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON dna_branches TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON dna_merges TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON dna_version_rollbacks TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON dna_version_analytics TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON dna_export_history TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON dna_version_comments TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON dna_version_tests TO authenticated;

-- Grant usage on functions
GRANT EXECUTE ON FUNCTION calculate_next_version(UUID, VARCHAR(20)) TO authenticated;
GRANT EXECUTE ON FUNCTION create_version_snapshot(UUID, VARCHAR(255), TEXT, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION track_version_analytics(UUID, JSONB, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION initialize_brand_versioning() TO authenticated;

COMMIT;