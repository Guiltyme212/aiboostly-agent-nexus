import { useState } from "react";
import { Sliders } from "@phosphor-icons/react";

interface MagicBentoControlsProps {
  onSettingsChange: (settings: MagicBentoSettings) => void;
  initialSettings: MagicBentoSettings;
}

export interface MagicBentoSettings {
  spotlightRadius: number;
  enableStars: boolean;
  enableSpotlight: boolean;
  enableTilt: boolean;
  clickEffect: boolean;
  enableMagnetism: boolean;
  disableAnimations: boolean;
  textAutoHide: boolean;
  enableBorderGlow: boolean;
}

const MagicBentoControls = ({ onSettingsChange, initialSettings }: MagicBentoControlsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<MagicBentoSettings>(initialSettings);

  const updateSetting = <K extends keyof MagicBentoSettings>(
    key: K,
    value: MagicBentoSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <>
      {/* Floating Control Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[9999] w-14 h-14 bg-primary hover:bg-primary/90 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Customize MagicBento Effects"
      >
        <Sliders size={24} weight="bold" className="text-background" />
      </button>

      {/* Control Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 z-[9998] w-80 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6 backdrop-blur-xl">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white">Customize</h3>
          </div>

          {/* Spotlight Radius Slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-white text-sm font-medium">Spotlight Radius</label>
              <span className="text-primary text-sm font-semibold">{settings.spotlightRadius}</span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="10"
              value={settings.spotlightRadius}
              onChange={(e) => updateSetting('spotlightRadius', Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>

          {/* Toggle Controls */}
          <div className="space-y-4">
            <ToggleControl
              label="Stars Effect"
              checked={settings.enableStars}
              onChange={(checked) => updateSetting('enableStars', checked)}
            />
            <ToggleControl
              label="Spotlight Effect"
              checked={settings.enableSpotlight}
              onChange={(checked) => updateSetting('enableSpotlight', checked)}
            />
            <ToggleControl
              label="Tilt Effect"
              checked={settings.enableTilt}
              onChange={(checked) => updateSetting('enableTilt', checked)}
            />
            <ToggleControl
              label="Click Effect"
              checked={settings.clickEffect}
              onChange={(checked) => updateSetting('clickEffect', checked)}
            />
            <ToggleControl
              label="Magnetism"
              checked={settings.enableMagnetism}
              onChange={(checked) => updateSetting('enableMagnetism', checked)}
            />
            <ToggleControl
              label="Border Glow"
              checked={settings.enableBorderGlow}
              onChange={(checked) => updateSetting('enableBorderGlow', checked)}
            />
            <ToggleControl
              label="Text Auto Hide"
              checked={settings.textAutoHide}
              onChange={(checked) => updateSetting('textAutoHide', checked)}
            />
            <ToggleControl
              label="Disable All Animations"
              checked={settings.disableAnimations}
              onChange={(checked) => updateSetting('disableAnimations', checked)}
            />
          </div>
        </div>
      )}
    </>
  );
};

interface ToggleControlProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleControl = ({ label, checked, onChange }: ToggleControlProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white text-sm font-medium">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
          checked ? 'bg-primary' : 'bg-white/20'
        }`}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default MagicBentoControls;
