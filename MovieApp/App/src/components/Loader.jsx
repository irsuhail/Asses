export default function Loader({ small=false }) {
  return (
    <div className={`flex items-center justify-center ${small ? 'py-2' : 'py-6'}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  )
}
