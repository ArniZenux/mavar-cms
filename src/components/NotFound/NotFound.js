export function NotFoundPage() {
  return (
    <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
      <div style={{ background: 'radial-gradient(50% 109137.91% at 50% 50%, rgba(233, 30, 99, 0.1) 0%, rgba(254, 244, 247, 0) 100%)' }} className="text-center">
        <span className="bg-white text-pink-500 font-bold text-2xl inline-block px-3">404</span>
      </div>
      <div className="mt-6 mb-5 font-bold text-6xl text-900 text-center">Það finnst ekki neitt</div>
        <p className="text-700 text-3xl mt-0 mb-6 text-center">Þvi miður að við getum ekki finnið síða sem þú ert að leita.</p>
  </div>
  );
}