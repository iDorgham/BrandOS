import React from 'react';
import { SettingsLayout } from './SettingsLayout';

interface SettingsViewProps {
    onAuth: () => void;
}

export const SettingsView = React.memo<SettingsViewProps>((props) => {
    return <SettingsLayout {...props} />;
});
