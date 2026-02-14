import React from 'react';
import { NewWorkflowModal } from './NewWorkflowModal';
import { UserWorkflowsModal } from './UserWorkflowsModal';
import { WorkflowLibraryModal } from './WorkflowLibraryModal';
import { ResetCanvasModal } from './ResetCanvasModal';
import { ModulesManager } from './ModulesManager';

interface BoardModalsProps {
    isNewWorkflowOpen: boolean;
    setIsNewWorkflowOpen: (val: boolean) => void;
    handleCreateNewWorkflow: (name: string, description: string) => void;
    handleManualSave: () => void;
    hasUnsavedChanges: boolean;
    isUserWorkflowsOpen: boolean;
    setIsUserWorkflowsOpen: (val: boolean) => void;
    isWorkflowLibraryOpen: boolean;
    setIsWorkflowLibraryOpen: (val: boolean) => void;
    onInjectTemplate: (id: string) => void;
    isModulesManagerOpen: boolean;
    setIsModulesManagerOpen: (val: boolean) => void;
    isResetModalOpen: boolean;
    setIsResetModalOpen: (val: boolean) => void;
    clearCanvas: () => void;
    resetConfirmName: string;
    setResetConfirmName: (val: string) => void;
}

export const BoardModals: React.FC<BoardModalsProps> = ({
    isNewWorkflowOpen,
    setIsNewWorkflowOpen,
    handleCreateNewWorkflow,
    handleManualSave,
    hasUnsavedChanges,
    isUserWorkflowsOpen,
    setIsUserWorkflowsOpen,
    isWorkflowLibraryOpen,
    setIsWorkflowLibraryOpen,
    onInjectTemplate,
    isModulesManagerOpen,
    setIsModulesManagerOpen,
    isResetModalOpen,
    setIsResetModalOpen,
    clearCanvas,
    resetConfirmName,
    setResetConfirmName
}) => {
    return (
        <>
            <NewWorkflowModal
                isOpen={isNewWorkflowOpen}
                onClose={() => setIsNewWorkflowOpen(false)}
                onCreate={handleCreateNewWorkflow}
                onSaveCurrent={handleManualSave}
                hasUnsavedChanges={hasUnsavedChanges}
            />

            <UserWorkflowsModal
                isOpen={isUserWorkflowsOpen}
                onClose={() => setIsUserWorkflowsOpen(false)}
            />

            <WorkflowLibraryModal
                isOpen={isWorkflowLibraryOpen}
                onClose={() => setIsWorkflowLibraryOpen(false)}
                onSelectTemplate={(id) => {
                    onInjectTemplate(id);
                    setIsWorkflowLibraryOpen(false);
                }}
            />

            <ModulesManager
                isOpen={isModulesManagerOpen}
                onClose={() => setIsModulesManagerOpen(false)}
            />

            <ResetCanvasModal
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                onConfirm={() => {
                    clearCanvas();
                    setIsResetModalOpen(false);
                    setResetConfirmName('');
                }}
                confirmName={resetConfirmName}
                setConfirmName={setResetConfirmName}
            />
        </>
    );
};
