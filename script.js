document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.getElementById('ourInitiativesDropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');

    dropdownToggle.addEventListener('mouseover', function() {
        dropdownMenu.classList.add('show');
    });

    dropdownToggle.addEventListener('mouseout', function(event) {
        if (!event.relatedTarget || !event.relatedTarget.closest('.dropdown-menu')) {
            dropdownMenu.classList.remove('show');
        }
    });

    dropdownMenu.addEventListener('mouseleave', function() {
        dropdownMenu.classList.remove('show');
    });
});