export async function GET() {
  const js = `(() => {
    const script = document.currentScript;
    const targetId = script?.getAttribute('data-target') || 'gaza-testimonials';
    const mount = document.getElementById(targetId);
    if (!mount) return;
    mount.innerHTML = '<iframe src="/embed/widget" style="width:100%;height:420px;border:0;border-radius:8px;overflow:hidden;" allowtransparency="true"></iframe>';
  })();`;

  return new Response(js, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}


