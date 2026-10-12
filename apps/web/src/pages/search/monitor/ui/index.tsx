import { WorkspaceShell } from "composition/layer";
import { AdminAlertBanner } from "widgets/admin";
import { AnalysisChat } from "widgets/analysis";
import { SearchCommand, SearchWorkspaceLead, SearchWorkspaceOffers } from "widgets/search";

export function Monitor() {
  return (
    <main id="main-content">
      <SearchCommand />
      <WorkspaceShell
        lead={
          <>
            <AdminAlertBanner />
            <SearchWorkspaceLead />
          </>
        }
        chat={<AnalysisChat />}
        offers={<SearchWorkspaceOffers />}
      />
    </main>
  );
}
