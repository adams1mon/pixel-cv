import { useCVStore } from "@/stores/cv-store";

export function TemplateSettings() {

  const setPageWrap = useCVStore(s => s.setPageWrap);

  return (
    <div>
      <label htmlFor="page-wrap">
        Enable PDF page wrapping
      </label>
      <input
        id="page-wrap"
        type="checkbox"
        onChange={e => setPageWrap(e.target.checked)}
      />
    </div>
  )
}