export function VisibilityToggle({
  visible,
  onToggle,
}: {
  visible: boolean
  onToggle: () => void
}) {

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={visible}
          onChange={onToggle}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <span className="text-sm font-medium text-gray-700">
          Show in PDF
        </span>
      </label>
      <span className="text-xs text-gray-500">
        {visible ? 'This section will appear in your CV' : 'This section will be hidden in your CV'}
      </span>
    </div>
  );
}