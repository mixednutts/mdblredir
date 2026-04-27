(function () {
  // Only run on the MDBList preferences page
  if (!location.href.startsWith('https://mdblist.com/preferences')) return;

  // Wait a brief moment for the page to render (SPA-ish behaviour)
  setTimeout(() => {
    const bodyText = document.body.innerText || '';
    const hasApiAccess = bodyText.includes('API Access');

    if (!hasApiAccess) {
      window.location.replace('https://mdblist.com/signin/');
    }
  }, 300);
})();
