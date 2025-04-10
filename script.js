document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.getElementById('ourInitiativesDropdown');
    const dropdownMenu = dropdownToggle.nextElementSibling;

    dropdownToggle.addEventListener('mouseenter', function(event) {
      dropdownMenu.classList.add('show');
      dropdownToggle.setAttribute('aria-expanded', 'true');
    });

    dropdownToggle.addEventListener('mouseleave', function(event) {
      setTimeout(() => {
        if (!dropdownMenu.matches(':hover')) {
          dropdownMenu.classList.remove('show');
          dropdownToggle.setAttribute('aria-expanded', 'false');
        }
      }, 100); // Add a slight delay to allow mouse to enter the dropdown menu
    });

    dropdownMenu.addEventListener('mouseleave', function(event) {
      dropdownMenu.classList.remove('show');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    });
  });