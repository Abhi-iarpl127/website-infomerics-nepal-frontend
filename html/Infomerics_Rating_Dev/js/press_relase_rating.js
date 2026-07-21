
// ==============================
// Pagination Cards
// ==============================
const initPaginationCards = () => {
    const cards = document.querySelectorAll('.card-custom');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageButtons = document.querySelectorAll('.pagination-custom .btn-page[data-page]');
    let currentPage = 1;

    const showPage = (page) => {
        cards.forEach(card => {
            card.classList.toggle('d-none', !card.classList.contains(`page-${page}`));
        });

        pageButtons.forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.page) === page);
        });

        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === pageButtons.length;
    };

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < pageButtons.length) {
            currentPage++;
            showPage(currentPage);
        }
    });

    pageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentPage = parseInt(btn.dataset.page);
            showPage(currentPage);
        });
    });

    showPage(currentPage);
};

// ==============================
// Subscription Modal + Download
// ==============================
const initSubscriptionModal = () => {
    const downloadButtons = document.querySelectorAll('.for-download-subscription');
    const modal = document.getElementById('subscriptionModal');
    const form = document.getElementById('subscriptionForm');
    const cancelButton = document.getElementById('cancelSubscription');
    const closeButton = document.querySelector('.close-button-custom');
    const downloadURL = 'path/to/your/Anvil_Energy_Press_Release.pdf';

    const closeModal = () => modal.style.display = 'none';

    // Open modal
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => modal.style.display = 'block');
    });

    // Close modal
    cancelButton.addEventListener('click', closeModal);
    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // Form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect form data (optional)
        const formData = {
            fullName: document.getElementById('fullName').value,
            emailId: document.getElementById('emailId').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            companyName: document.getElementById('companyName').value
        };
        console.log('User subscribed:', formData);

        // Trigger download
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'Anvil_Energy_Press_Release.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        form.reset();
        closeModal();
    });
};

// ==============================
// Init All
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    initPaginationCards();
    initSubscriptionModal();
});

