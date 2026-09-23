import { UserSettings } from "widgets/user";

export function Settings({ onBack }: { onBack: () => void }) {
  return <UserSettings onBack={onBack} />;
}
