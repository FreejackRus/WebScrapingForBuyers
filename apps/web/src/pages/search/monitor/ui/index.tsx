import { WorkspaceShell } from "composition/layer";
import { AnalysisChat } from "widgets/analysis";
import { SearchCommand, SearchWorkspaceLead, SearchWorkspaceOffers } from "widgets/search";

export function Monitor() {
  return (
    <main id="main-content">
      <SearchCommand />
      <WorkspaceShell
        lead={<SearchWorkspaceLead />}
        chat={<AnalysisChat />}
        offers={<SearchWorkspaceOffers />}
      />
    </main>
  );
}
