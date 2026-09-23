import { WorkspaceShell } from "composition/layer";
import { AnalysisChat } from "widgets/analysis";
import { SearchCommand, SearchWorkspace } from "widgets/search";

export function Monitor() {
  return (
    <main id="main-content">
      <SearchCommand />
      <WorkspaceShell main={<SearchWorkspace />} chat={<AnalysisChat />} />
    </main>
  );
}
