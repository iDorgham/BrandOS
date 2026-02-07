import { SkillDefinition } from '../types';

export const PDFExportSkill: SkillDefinition = {
  id: 'pdf-export',
  name: 'PDF Export & Production',
  description: 'Master the creation of professional PDF files for print, web, and interactive applications',
  category: 'technical' as any,
  level: 'intermediate' as any,
  status: 'active' as any,
  tags: ['pdf-export', 'print-production', 'document-optimization', 'interactive-pdf', 'prepress'],
  requirements: ['design-fundamentals', 'typography', 'vector-design'],
  capabilities: [
    'print-pdf-creation',
    'web-pdf-optimization',
    'interactive-pdf-design',
    'prepress-standards',
    'color-management',
    'font-embedding',
    'compression-techniques',
    'accessibility-compliance',
    'automation-workflows',
    'quality-control'
  ],
  config: {
    maxLevel: 10,
    experiencePoints: 110,
    learningCurve: 'exponential' as const
  },
  metadata: {
    createdBy: 'system',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: '2.0.0'
  }
};

// PDF types and specifications
export const PDFTypes = {
  printReady: {
    description: 'High-resolution PDFs for professional printing',
    specifications: {
      resolution: '300 DPI minimum',
      color: 'CMYK + Spot colors',
      fonts: 'Embedded or outlined',
      bleed: '0.125-0.25 inches',
      compression: 'Lossless for images',
      transparency: 'Flattened or preserved based on printer capability'
    },
    standards: ['PDF/X-1a', 'PDF/X-4', 'PDF/X-3'],
    applications: ['Magazines', 'Brochures', 'Packaging', 'Large format printing'],
    qualityChecks: ['Preflight', 'Proofing', 'Color separation', 'Bleed verification']
  },
  webOptimized: {
    description: 'Lightweight PDFs for digital distribution',
    specifications: {
      resolution: '150-300 DPI',
      color: 'RGB',
      fonts: 'Embedded with subsets',
      compression: 'Aggressive optimization',
      interactivity: 'Hyperlinks, bookmarks',
      searchability: 'OCR and text selection'
    },
    applications: ['Ebooks', 'Documentation', 'Web forms', 'Digital catalogs'],
    optimization: ['Image compression', 'Font subsetting', 'Structure optimization']
  },
  interactive: {
    description: 'PDFs with interactive elements and multimedia',
    features: [
      'Interactive forms',
      'Multimedia integration',
      'Navigation elements',
      'JavaScript functionality',
      '3D models',
      'Video and audio',
      'Annotations',
      'Digital signatures'
    ],
    applications: ['Presentations', 'Training materials', 'Applications', 'Reports'],
    considerations: ['File size', 'Compatibility', 'Security', 'User experience']
  },
  archival: {
    description: 'Long-term storage and preservation PDFs',
    standards: ['PDF/A-1a', 'PDF/A-2a', 'PDF/A-3a'],
    requirements: [
      'Embedded fonts',
      'Device-independent color',
      'No external dependencies',
      'Metadata standards',
      'Security restrictions controlled'
    ],
    applications: ['Legal documents', 'Historical archives', 'Compliance', 'Government']
  }
};

// Print production standards
export const PrintProductionStandards = {
  colorManagement: {
    colorSpaces: {
      cmyk: {
        description: 'Cyan, Magenta, Yellow, Black for process printing',
        applications: ['Full-color printing', 'Photographs', 'Complex illustrations'],
        considerations: ['Gamut limitations', 'Proofing accuracy', 'Printer profiles']
      },
      spotColors: {
        description: 'Premixed inks for specific colors',
        systems: ['Pantone Matching System', 'HKS', 'DIC', 'TOYO'],
        applications: ['Brand colors', 'Metallic inks', 'Specialty printing'],
        benefits: ['Color accuracy', 'Consistency', 'Special effects']
      },
      grayscale: {
        description: 'Single color printing using black ink',
        applications: ['Text documents', ' Newspapers', 'Cost-effective printing'],
        considerations: ['Contrast optimization', 'Readability', 'Image conversion']
      }
    },
    profiling: {
      description: 'Color accuracy through device profiles',
      types: ['Input profiles', 'Display profiles', 'Output profiles', 'Proofing profiles'],
      workflow: ['Profile selection', 'Soft proofing', 'Hard proofing', 'Quality control'],
      standards: ['ICC profiles', 'Color calibration', 'Device characterization']
    }
  },
  prepressWorkflow: {
    filePreparation: {
      steps: [
        'Document setup',
        'Bleed and margin setup',
        'Color conversion',
        'Font handling',
        'Image optimization',
        'Preflight checking'
      ],
      tools: ['Adobe Preflight', 'Enfocus PitStop', 'FlightCheck', 'Custom scripts'],
      deliverables: ['Print-ready PDF', 'Proof files', 'Separation proofs', 'Documentation']
    },
    qualityControl: {
      checks: [
        'Resolution verification',
        'Color space validation',
        'Font embedding verification',
        'Bleed verification',
        'Trap and overprint settings',
        'Transparency handling'
      ],
      tools: ['Preflight profiles', 'Automated checks', 'Manual verification', 'Sample proofs'],
      standards: ['PDF/X compliance', 'Printer specifications', 'Industry standards']
    }
  },
  finishingSpecs: {
    binding: {
      types: ['Saddle-stitch', 'Perfect bound', 'Spiral bound', 'Case bound', 'Mechanical binding'],
      considerations: ['Page count limitations', 'Spine calculations', 'Creep compensation', 'Imposition'],
      specifications: ['Cover design', 'Spine width', 'Bleed requirements', 'Fold marks']
    },
    cutting: {
      considerations: ['Cut marks', 'Bleed requirements', 'Safety margins', 'Die lines'],
      processes: ['Guillotine cutting', 'Die cutting', 'Laser cutting', 'Digital cutting'],
      specifications: ['Tolerance requirements', 'Material considerations', 'Production workflow']
    }
  }
};

// PDF optimization techniques
export const PDFOptimization = {
  imageOptimization: {
    compression: {
      lossless: {
        description: 'Perfect quality reproduction',
        formats: ['ZIP', 'CCITT Group 4', 'LZW'],
        applications: ['Line art', 'Text', 'Simple graphics'],
        benefits: ['No quality loss', 'Perfect reproduction']
      },
      lossy: {
        description: 'Reduced file size with minimal quality loss',
        formats: ['JPEG', 'JPEG 2000'],
        applications: ['Photographs', 'Complex images', 'Web distribution'],
        settings: ['Quality levels', 'Progressive loading', 'Optimization']
      }
    },
    resolutionManagement: {
      print: {
        standards: ['300 DPI for images', '600-1200 DPI for line art', '1200+ DPI for text'],
        considerations: ['Image scaling', 'Viewing distance', 'Printing method']
      },
      screen: {
        standards: ['150-200 DPI for screen', '72-96 DPI for web', 'Optimized for devices'],
        considerations: ['File size', 'Loading speed', 'Device capabilities']
      }
    }
  },
  fontOptimization: {
    embedding: {
      fullEmbedding: {
        description: 'Complete font inclusion in PDF',
        benefits: ['Perfect reproduction', 'Cross-platform compatibility'],
        drawbacks: ['Larger file size', 'Licensing restrictions']
      },
      subsetting: {
        description: 'Include only used characters',
        benefits: ['Smaller file size', 'Faster loading'],
        considerations: ['Edit limitations', 'Character availability']
      }
    },
    outlining: {
      description: 'Convert text to vector paths',
      benefits: ['No font dependencies', 'Perfect reproduction'],
      drawbacks: ['Larger file size', 'Not searchable', 'Not editable']
    }
  },
  structureOptimization: {
    compression: {
      objectCompression: {
        description: 'Compress PDF object streams',
        benefits: ['Reduced file size', 'Faster loading'],
        methods: ['Flate compression', 'LZW compression']
      },
      streamOptimization: {
        description: 'Optimize data streams within PDF',
        techniques: ['Object reordering', 'Duplicate removal', 'Reference optimization']
      }
    },
    cleanup: {
      unusedRemoval: {
        description: 'Remove unused elements',
        elements: ['Unused fonts', 'Unused images', 'Redundant objects', 'Metadata cleanup']
      },
      linearization: {
        description: 'Optimize for web viewing',
        benefits: ['Fast web view', 'Progressive loading', 'Better user experience']
      }
    }
  }
};

// Interactive PDF features
export const InteractivePDFFeatures = {
  forms: {
    formFields: {
      types: [
        'Text fields',
        'Checkboxes',
        'Radio buttons',
        'Dropdown lists',
        'List boxes',
        'Buttons',
        'Date fields',
        'Signature fields'
      ],
      properties: [
        'Field properties',
        'Validation rules',
        'Calculation formulas',
        'Appearance customization',
        'Tab order',
        'Accessibility settings'
      ],
      applications: ['Applications', 'Surveys', 'Orders', 'Documentation']
    },
    calculations: {
      types: ['Simple arithmetic', 'Complex formulas', 'Conditional logic', 'Data validation'],
      functions: ['Sum', 'Average', 'Count', 'Custom functions', 'Cross-field calculations'],
      applications: ['Invoices', 'Order forms', 'Financial documents', 'Reports']
    }
  },
  navigation: {
    bookmarks: {
      description: 'Hierarchical navigation structure',
      features: ['Multi-level bookmarks', 'Custom actions', 'Styling options', 'Auto-generation'],
      applications: ['Documentation', 'Manuals', 'Reports', 'Presentations']
    },
    links: {
      types: [
        'External hyperlinks',
        'Internal page links',
        'Email links',
        'File links',
        'Web links'
      ],
      features: ['Link appearance', 'Action settings', 'Security considerations'],
      applications: ['Web integration', 'Reference materials', 'Documentation']
    }
  },
  multimedia: {
    video: {
      formats: ['MP4', 'AVI', 'MOV', 'Flash'],
      considerations: ['File size', 'Compatibility', 'Player requirements', 'Bandwidth'],
      features: ['Autoplay', 'Controls', 'Loop options', 'Poster frames']
    },
    audio: {
      formats: ['MP3', 'WAV', 'AIFF'],
      applications: ['Narration', 'Background music', 'Sound effects'],
      features: ['Playback controls', 'Loop options', 'Volume control']
    },
    3D: {
      formats: ['U3D', 'PRC', 'PDF 3D'],
      applications: ['Product visualization', 'Technical documentation', 'Educational content'],
      features: ['Interactive controls', 'View settings', 'Animation support']
    }
  }
};

// Level progression
export const PDFExportLevels = {
  1: {
    title: 'PDF Export Novice',
    description: 'Understanding basic PDF creation and export settings',
    requirements: ['Basic design knowledge', 'Software familiarity'],
    skills: ['Basic PDF creation', 'Simple optimization', 'Export settings'],
    experienceNeeded: 0
  },
  2: {
    title: 'PDF Export Apprentice',
    description: 'Creating professional PDFs for print and web',
    requirements: ['PDF projects', 'Quality control understanding'],
    skills: ['Print-ready PDFs', 'Web optimization', 'Basic prepress'],
    experienceNeeded: 150
  },
  3: {
    title: 'PDF Export Practitioner',
    description: 'Advanced PDF techniques and interactive features',
    requirements: ['Complex PDF projects', 'Interactive elements'],
    skills: ['Interactive PDFs', 'Advanced optimization', 'Production workflow'],
    experienceNeeded: 400
  },
  4: {
    title: 'PDF Export Specialist',
    description: 'Master of PDF production and automation',
    requirements: ['Production workflow', 'Automation systems'],
    skills: ['Production expertise', 'Workflow automation', 'Quality systems'],
    experienceNeeded: 1000
  },
  5: {
    title: 'PDF Export Expert',
    description: 'Industry leader in PDF production and innovation',
    requirements: ['Industry recognition', 'Innovative solutions'],
    skills: ['Industry innovation', 'System architecture', 'Standards development'],
    experienceNeeded: 2000
  }
};

// Practical exercises
export const PDFExportExercises = {
  1: [
    {
      title: 'Basic PDF Export',
      description: 'Create properly formatted PDFs for different purposes',
      experienceReward: 25,
      estimatedTime: 60
    },
    {
      title: 'Print Setup Mastery',
      description: 'Master print-ready PDF creation with proper settings',
      experienceReward: 30,
      estimatedTime: 90
    }
  ],
  2: [
    {
      title: 'Web PDF Optimization',
      description: 'Optimize PDFs for web distribution and speed',
      experienceReward: 40,
      estimatedTime: 120
    },
    {
      title: 'Color Management',
      description: 'Implement proper color management for print production',
      experienceReward: 45,
      estimatedTime: 150
    }
  ],
  3: [
    {
      title: 'Interactive Form Creation',
      description: 'Design and implement interactive PDF forms',
      experienceReward: 55,
      estimatedTime: 180
    },
    {
      title: 'Multimedia Integration',
      description: 'Create multimedia-rich PDF presentations',
      experienceReward: 50,
      estimatedTime: 160
    }
  ],
  4: [
    {
      title: 'Production Workflow',
      description: 'Design and implement a complete PDF production workflow',
      experienceReward: 75,
      estimatedTime: 250
    },
    {
      title: 'Automation Systems',
      description: 'Create automated PDF processing and optimization systems',
      experienceReward: 70,
      estimatedTime: 220
    }
  ],
  5: [
    {
      title: 'PDF Innovation Project',
      description: 'Develop innovative PDF solutions or technologies',
      experienceReward: 110,
      estimatedTime: 300
    },
    {
      title: 'Industry Standards Contribution',
      description: 'Create educational content or tools that advance PDF production',
      experienceReward: 95,
      estimatedTime: 250
    }
  ]
};
