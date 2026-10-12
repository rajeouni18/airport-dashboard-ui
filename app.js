(() => {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const toast = document.getElementById('toast');
  const search = document.getElementById('globalSearch');
  const rows = Array.from(document.querySelectorAll('.feed-row'));
  const emptyState = document.getElementById('emptyState');
  let timer;

  const notify = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 2600);
  };

  const closeSidebar = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  };

  document.getElementById('openSidebar').addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('show');
  });
  document.getElementById('closeSidebar').addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach((x) => x.classList.remove('active'));
      item.classList.add('active');
      closeSidebar();
      notify(`بخش «${item.dataset.title}» در نسخه نمایشی رابط کاربری است.`);
    });
  });

  // جست‌وجو در فعالیت‌های اخیر
  search.addEventListener('input', () => {
    const term = search.value.trim().toLocaleLowerCase('fa');
    let visible = 0;
    rows.forEach((row) => {
      const haystack = `${row.innerText} ${row.dataset.search || ''}`.toLocaleLowerCase('fa');
      const match = !term || haystack.includes(term);
      row.hidden = !match;
      if (match) visible++;
    });
    if (emptyState) emptyState.hidden = visible !== 0;
  });

  document.getElementById('viewAll').addEventListener('click', () => notify('در این نسخه، آخرین فعالیت‌های سامانه نمایش داده می‌شود.'));

  document.querySelectorAll('.qbtn, .table-link, .ghost-btn').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (el.tagName === 'A') e.preventDefault();
      notify('این عملیات در نسخه نمایشی رابط کاربری است.');
    });
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      search.focus();
    }
    if (e.key === 'Escape') {
      closeSidebar();
      search.blur();
    }
  });
})();
