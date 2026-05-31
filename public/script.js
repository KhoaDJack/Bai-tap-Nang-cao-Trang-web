const roomsGrid = document.getElementById('roomsGrid');
const reviewsGrid = document.getElementById('reviewsGrid');
const staffGrid = document.getElementById('staffGrid');
const roomTypeSelect = document.getElementById('roomType');
const roomsFilter = document.getElementById('roomsFilter');
const hotelForm = document.getElementById('hotelForm');
const resultSection = document.getElementById('result');
const resultText = document.getElementById('resultText');
const bookingDetails = document.getElementById('bookingDetails');
const detailRoom = document.getElementById('detailRoom');
const detailCheckin = document.getElementById('detailCheckin');
const detailCheckout = document.getElementById('detailCheckout');
const detailGuests = document.getElementById('detailGuests');
const detailNights = document.getElementById('detailNights');
const detailTotal = document.getElementById('detailTotal');
const detailGuestName = document.getElementById('detailGuestName');
const detailGuestId = document.getElementById('detailGuestId');
const detailRoomId = document.getElementById('detailRoomId');
const confirmBooking = document.getElementById('confirmBooking');
const confirmMessage = document.getElementById('confirmMessage');
const bookingList = document.getElementById('bookingList');
const bookingMessage = document.getElementById('bookingMessage');
const reviewManageList = document.getElementById('reviewManageList');
const staffManageList = document.getElementById('staffManageList');
const foodManageList = document.getElementById('foodManageList');
const serviceManageList = document.getElementById('serviceManageList');
const reviewManageMessage = document.getElementById('reviewManageMessage');
const staffManageMessage = document.getElementById('staffManageMessage');
const foodManageMessage = document.getElementById('foodManageMessage');
const serviceManageMessage = document.getElementById('serviceManageMessage');
const reviewForm = document.getElementById('reviewForm');
const staffForm = document.getElementById('staffForm');
const serviceForm = document.getElementById('serviceForm');
const reviewMessage = document.getElementById('reviewMessage');
const staffMessage = document.getElementById('staffMessage');
const serviceMessage = document.getElementById('serviceMessage');
const reviewSortSelect = document.getElementById('reviewSort');
const dashboardStats = document.getElementById('dashboardStats');
const bookingOverview = document.getElementById('bookingOverview');
const serviceGrid = document.getElementById('serviceGrid');
const foodGrid = document.getElementById('foodGrid');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');
const mainNav = document.querySelector('.main-nav');
const logoutBtn = document.getElementById('logoutBtn');
const serviceAccessForm = document.getElementById('serviceAccessForm');
const serviceAccessMessage = document.getElementById('serviceAccessMessage');
const serviceAccessGate = document.getElementById('serviceAccessGate');
const serviceContent = document.getElementById('serviceContent');
const serviceLogoutBtn = document.getElementById('serviceLogoutBtn');
const userManagerPanel = document.getElementById('userManagerPanel');
const userManagerList = document.getElementById('userManagerList');
const userManagerMessage = document.getElementById('userManagerMessage');

let latestBooking = null;
let currentGuestId = null;
let currentUserId = localStorage.getItem('hotelAppUser');
let isAuthenticated = localStorage.getItem('hotelAppAuth') === 'true';
let requestedPage = null;
let currentRoomFilter = 'all';
let roomData = [];
let foodData = [
  {
    id: 'dining-steak',
    slug: 'dining-steak',
    category: 'Dining',
    title: "Chef's Signature Steak",
    description: 'Grilled sirloin with garlic butter, seasonal vegetables, and rosemary jus.',
    price: 28,
    capacity: 1,
    image: 'image food and drink/Chef Signature Steak.jpg',
  },
  {
    id: 'dining-paella',
    slug: 'dining-paella',
    category: 'Dining',
    title: 'Seafood Paella',
    description: 'Saffron rice with prawns, mussels, squid, and chorizo.',
    price: 24,
    capacity: 1,
    image: 'image food and drink/Seafood Paella.jpg',
  },
  {
    id: 'dining-salad',
    slug: 'dining-salad',
    category: 'Dining',
    title: 'Garden Salad',
    description: 'Mixed greens, heirloom tomatoes, cucumber, avocado, and citrus vinaigrette.',
    price: 12,
    capacity: 1,
    image: 'image food and drink/Garden Salad.JPG',
  },
  {
    id: 'dining-burger',
    slug: 'dining-burger',
    category: 'Dining',
    title: 'Classic Burger',
    description: 'Beef patty, cheddar cheese, caramelized onions, lettuce, and house fries.',
    price: 18,
    capacity: 1,
    image: 'image food and drink/Classic Burger.jpg',
  },
  {
    id: 'dining-pasta',
    slug: 'dining-pasta',
    category: 'Dining',
    title: 'Creamy Pasta',
    description: 'Fettuccine in parmesan cream sauce with mushrooms and fresh herbs.',
    price: 20,
    capacity: 1,
    image: 'image food and drink/Creamy Pasta.jpg',
  },
  {
    id: 'dining-lobster',
    slug: 'dining-lobster',
    category: 'Dining',
    title: 'Grilled Lobster',
    description: 'Fresh lobster tail grilled with lemon butter, served with seasonal vegetables.',
    price: 35,
    capacity: 1,
    image: 'image food and drink/Lobster.jpg',
  },
  {
    id: 'breakfast-coffee',
    slug: 'breakfast-coffee',
    category: 'Breakfast',
    title: 'Coffee & Bacon',
    description: 'Buttery bacon with a side of house-brewed coffee and eggs.',
    price: 15,
    capacity: 1,
    image: 'image food and drink/Breakfast Coffee, Bacon and Egg..jpg',
  },
  {
    id: 'breakfast-rice',
    slug: 'breakfast-rice',
    category: 'Breakfast',
    title: 'Fried Rice Bowl',
    description: 'Stir-fried rice with vegetables, egg, and savory soy glaze.',
    price: 12,
    capacity: 1,
    image: 'image food and drink/Breakfast Fried Rice.jpg',
  },
  {
    id: 'breakfast-ramen',
    slug: 'breakfast-ramen',
    category: 'Breakfast',
    title: 'Ramen Bowl',
    description: 'Hearty noodles served with rich broth, greens, and soft yolk egg.',
    price: 14,
    capacity: 1,
    image: 'image food and drink/Breakfast Ramen.jpg',
  },
  {
    id: 'breakfast-sandwich',
    slug: 'breakfast-sandwich',
    category: 'Breakfast',
    title: 'Sandwich Stack',
    description: 'Toasted bread layered with eggs, cheese, and crisp seasonal greens.',
    price: 13,
    capacity: 1,
    image: 'image food and drink/Breakfast Sandwich.jpg',
  },
  {
    id: 'breakfast-sushi',
    slug: 'breakfast-sushi',
    category: 'Breakfast',
    title: 'Sushi Platter',
    description: 'Fresh sushi pieces arranged with pickled ginger and soy dip.',
    price: 18,
    capacity: 1,
    image: 'image food and drink/Breakfast Sushi.JPG',
  },
  {
    id: 'drink-honey-tea',
    slug: 'drink-honey-tea',
    category: 'Drinks',
    title: 'Honey Milk Tea',
    description: 'Silky milk tea sweetened with golden honey and tapioca pearls.',
    price: 8,
    capacity: 1,
    image: 'image food and drink/Honey Milk Tea.Jpg',
  },
  {
    id: 'drink-orange-juice',
    slug: 'drink-orange-juice',
    category: 'Drinks',
    title: 'Orange Juice',
    description: 'Fresh-squeezed oranges served chilled with mint garnish.',
    price: 7,
    capacity: 1,
    image: 'image food and drink/Orange Juice.Jpg',
  },
  {
    id: 'drink-purple-foam',
    slug: 'drink-purple-foam',
    category: 'Drinks',
    title: 'Purple Foam',
    description: 'Creamy purple drink topped with a light citrus foam.',
    price: 9,
    capacity: 1,
    image: 'image food and drink/Purple Foam.jpg',
  },
  {
    id: 'drink-cocktails',
    slug: 'drink-cocktails',
    category: 'Drinks',
    title: 'Classic Cocktails',
    description: 'Charismatic cocktail selection with timeless recipes.',
    price: 11,
    capacity: 1,
    image: 'image food and drink/Classic Cocktails.Jpg',
  },
  {
    id: 'drink-milkshake',
    slug: 'drink-milkshake',
    category: 'Drinks',
    title: 'Milkshake Juice',
    description: 'Creamy blended milkshake with a hint of fresh fruit juice.',
    price: 10,
    capacity: 1,
    image: 'image food and drink/Milkshake Juice.jpg',
  },
];

// Error handling and user messages
function showMessage(element, message, type = 'success') {
  if (!element) return;
  element.textContent = message;
  element.style.display = 'block';
  
  // Bootstrap alert classes
  element.className = 'alert mt-2';
  if (type === 'error') {
    element.classList.add('alert-danger');
  } else if (type === 'warning') {
    element.classList.add('alert-warning');
  } else {
    element.classList.add('alert-success');
  }
}

function getFriendlyError(error) {
  if (!error) return 'An unexpected error occurred. Please try again.';
  const message = error.message || String(error);
  
  // Map specific errors to user-friendly messages
  if (message.includes('Room ID must be')) return message;
  if (message.includes('Check-out date must be')) return message;
  if (message.includes('not available')) return 'Unfortunately, this room is not available for the selected dates. Please try different dates.';
  if (message.includes('not found')) return 'The requested item was not found. Please refresh and try again.';
  if (message.includes('already taken')) return message;
  if (message.includes('do not match')) return message;
  if (message.includes('fetch failed') || message.includes('Failed to fetch')) return 'Connection error. Please check your internet and try again.';
  if (message.includes('Network')) return 'Network error. Please try again later.';
  if (message.includes('Server error')) return 'Server error occurred. Please try again later.';
  if (message.includes('Bad Request')) return 'Invalid input. Please check your data and try again.';
  
  return 'Unable to complete this action. Please try again.';
}

function showLoadingSpinner(container) {
  if (!container) return;
  container.innerHTML = '<div class="loading-state"><div class="loading-spinner"></div><span>Loading...</span></div>';
}

function showSkeletons(container, count = 3) {
  if (!container) return;
  let html = '';
  for (let i = 0; i < count; i++) {
    html += `
      <div class="skeleton skeleton-card">
        <div class="skeleton skeleton-text" style="margin: 0 0 12px 0;"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>
    `;
  }
  container.innerHTML = html;
}

function getSafeImageUrl(imagePath) {
  return imagePath ? encodeURI(imagePath) : '';
}

function renderFoodPage() {
  if (!foodGrid) return;
  if (!foodData.length) {
    foodGrid.innerHTML = '<p>No food items are available at the moment.</p>';
    return;
  }

  const categories = [
    { key: 'Dining', title: 'Dining Menu' },
    { key: 'Breakfast', title: 'Breakfast Menu' },
    { key: 'Drinks', title: 'Drinks Menu' },
  ];

  foodGrid.innerHTML = categories
    .map(({ key, title }) => {
      const items = foodData.filter((item) => item.category === key);
      if (!items.length) return '';

      return `
        <div class="food-category">
          <h3 class="section-subtitle">${title}</h3>
          <div class="card-grid food-grid">
            ${items
              .map(
                (item) => `
                  <div class="card">
                    <div class="food-image" style="background-image: url('${getSafeImageUrl(item.image)}');"></div>
                    <div class="card-body">
                      <h4>${item.title}</h4>
                      <p>${item.description}</p>
                      <div class="card-meta">
                        <span>$${item.price}</span>
                        <span>${item.category}</span>
                      </div>
                    </div>
                  </div>
                `
              )
              .join('')}
          </div>
        </div>
      `;
    })
    .join('');
}

window.addEventListener('DOMContentLoaded', () => {
  loadRooms();
  loadReviews();
  loadStaff();
  loadServices();
  loadBookings();
  loadReviewManager();
  loadStaffManager();
  loadFoodManager();
  loadServiceManager();
  setupServiceManagerEvents();
  setupFoodManagerEvents();
  loadDashboard();
  setupReviewSorting();
  setupPageNavigation();
  setupLogin();
  updateAdminAccess();
  setupServiceAccess();
  setupUserManagerEvents();
});

function setupReviewSorting() {
  if (!reviewSortSelect) return;
  reviewSortSelect.addEventListener('change', loadReviews);
}

document.addEventListener('click', (event) => {
  const toggle = event.target.closest('.password-toggle');
  if (!toggle) return;

  const wrapper = toggle.closest('.password-input-wrapper');
  if (!wrapper) return;

  const input = wrapper.querySelector('input[type="password"], input[type="text"]');
  if (!input) return;

  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  toggle.textContent = isPassword ? '🙈' : '👁️';
});

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function setupPageNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetPage = event.currentTarget.getAttribute('href').slice(1);
      showPage(targetPage);
      closeMobileMenu(); // Close menu when navigation link clicked
    });
  });

  window.addEventListener('hashchange', () => {
    const hashPage = window.location.hash.slice(1);
    if (hashPage) showPage(hashPage);
  });

  const initialPage = window.location.hash ? window.location.hash.slice(1) : 'home';
  showPage(initialPage);

  // Setup hamburger menu
  setupHamburgerMenu();
}

// ============ HAMBURGER MENU FUNCTIONS ============
function setupHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavMenu = document.getElementById('mobileNavMenu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-menu a');

  if (!hamburgerBtn || !mobileNavMenu) return;

  // Toggle menu on hamburger click
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    mobileNavMenu.classList.toggle('active');
  });

  // Close menu when clicking menu links
  mobileMenuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetPage = link.getAttribute('href').slice(1);
      showPage(targetPage);
      closeMobileMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = mobileNavMenu.contains(event.target);
    const isClickOnHamburger = hamburgerBtn.contains(event.target);

    if (!isClickInsideMenu && !isClickOnHamburger && mobileNavMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

function closeMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavMenu = document.getElementById('mobileNavMenu');

  if (hamburgerBtn && mobileNavMenu) {
    hamburgerBtn.classList.remove('active');
    mobileNavMenu.classList.remove('active');
  }
}

function getSavedUsers() {
  const stored = localStorage.getItem('hotelAppUsers');
  return stored ? JSON.parse(stored) : [];
}

function saveNewUser(id, password) {
  const users = getSavedUsers();
  users.push({ id, password });
  localStorage.setItem('hotelAppUsers', JSON.stringify(users));
}

function isValidLogin(id, password) {
  if (id === 'admin' && password === 'ABC1234') {
    return true;
  }
  return getSavedUsers().some((user) => user.id === id && user.password === password);
}

function getCurrentUserId() {
  return localStorage.getItem('hotelAppUser');
}

function isAdminUser() {
  return isAuthenticated && currentUserId === 'admin';
}

function renderUserManager() {
  if (!userManagerList) return;

  if (!isAdminUser()) {
    userManagerList.innerHTML = `
      <div class="manage-item">
        <div class="booking-header">
          <div>
            <h4>Access denied</h4>
            <p>Only the admin can view user accounts.</p>
          </div>
        </div>
      </div>
    `;
    return;
  }

  const savedUsers = getSavedUsers();
  const users = [
    { id: 'admin', role: 'Administrator' },
    ...savedUsers.map((user) => ({ id: user.id, role: 'User' })),
  ];

  if (!users.length) {
    userManagerList.innerHTML = '<p>No users found.</p>';
    return;
  }

  userManagerList.innerHTML = users
    .map(
      (user) => `
        <div class="manage-item" data-id="${user.id}">
          <div class="booking-header">
            <div>
              <h4>${user.id}</h4>
              <p>${user.role}${user.id === 'admin' ? ' • Read only' : ''}</p>
            </div>
            ${user.id !== 'admin' ? `
            <div class="manager-actions">
              <button type="button" class="small-button edit-user" data-id="${user.id}">Edit</button>
              <button type="button" class="small-button delete-user" data-id="${user.id}">Delete</button>
            </div>
            ` : ''}
          </div>
          ${user.id !== 'admin' ? `
          <form class="user-edit hidden" data-id="${user.id}">
            <div class="field-group password-field">
              <label>Current password</label>
              <div class="password-input-wrapper">
                <input type="password" name="currentPassword" required />
                <button type="button" class="password-toggle" aria-label="Toggle password visibility">👁️</button>
              </div>
            </div>
            <div class="field-group password-field">
              <label>New password</label>
              <div class="password-input-wrapper">
                <input type="password" name="newPassword" required />
                <button type="button" class="password-toggle" aria-label="Toggle password visibility">👁️</button>
              </div>
            </div>
            <div class="field-group password-field">
              <label>Confirm new password</label>
              <div class="password-input-wrapper">
                <input type="password" name="confirmPassword" required />
                <button type="button" class="password-toggle" aria-label="Toggle password visibility">👁️</button>
              </div>
            </div>
            <button type="submit" class="small-button save-user">Save</button>
            <button type="button" class="small-button cancel-edit">Cancel</button>
          </form>
          ` : ''}
        </div>
      `
    )
    .join('');
}

function updateAdminAccess() {
  currentUserId = getCurrentUserId();
  const isAdmin = isAdminUser();

  document.querySelectorAll('.admin-only').forEach((link) => {
    link.classList.toggle('hidden', !isAdmin);
  });

  if (userManagerPanel) {
    userManagerPanel.classList.toggle('hidden', !isAdmin);
  }

  if (isAdmin) {
    renderUserManager();
  }
}

function setupUserManagerEvents() {
  if (!userManagerList) return;

  userManagerList.addEventListener('click', (event) => {
    const editButton = event.target.closest('.edit-user');
    if (editButton) {
      handleUserEdit(event);
      return;
    }

    const deleteButton = event.target.closest('.delete-user');
    if (deleteButton) {
      handleUserDelete(event);
      return;
    }

    const cancelButton = event.target.closest('.cancel-edit');
    if (cancelButton) {
      event.preventDefault();
      const form = cancelButton.closest('.user-edit');
      if (form) form.classList.add('hidden');
    }
  });

  userManagerList.addEventListener('submit', (event) => {
    const form = event.target.closest('.user-edit');
    if (form) {
      handleUserSave(event);
    }
  });
}

function handleUserEdit(event) {
  event.preventDefault();
  const button = event.target.closest('.edit-user');
  if (!button) return;
  const item = button.closest('.manage-item');
  if (!item) return;
  const form = item.querySelector('.user-edit');
  if (!form) return;

  document.querySelectorAll('.user-edit').forEach((editForm) => {
    if (editForm !== form) {
      editForm.classList.add('hidden');
    }
  });

  form.classList.toggle('hidden');
}

function handleUserDelete(event) {
  const userId = event.target.dataset.id;
  if (!userId || userId === 'admin') return;

  const confirmDelete = window.confirm(`Delete account '${userId}'? This cannot be undone.`);
  if (!confirmDelete) return;

  const users = getSavedUsers();
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    showMessage(userManagerMessage, 'Unable to delete account. Please refresh and try again.', 'error');
    return;
  }

  users.splice(index, 1);
  localStorage.setItem('hotelAppUsers', JSON.stringify(users));
  renderUserManager();
  showMessage(userManagerMessage, `✓ Account '${userId}' deleted successfully.`, 'success');
}

function handleUserSave(event) {
  event.preventDefault();
  const form = event.target.closest('.user-edit');
  if (!form) return;

  const userId = form.dataset.id;
  const formData = new FormData(form);
  const currentPassword = formData.get('currentPassword').trim();
  const newPassword = formData.get('newPassword').trim();
  const confirmPassword = formData.get('confirmPassword').trim();

  if (!currentPassword || !newPassword || !confirmPassword) {
    showMessage(userManagerMessage, 'Please complete all password fields.', 'error');
    return;
  }

  if (newPassword !== confirmPassword) {
    showMessage(userManagerMessage, 'New password and confirmation do not match.', 'error');
    return;
  }

  const users = getSavedUsers();
  const user = users.find((item) => item.id === userId);
  if (!user) {
    showMessage(userManagerMessage, 'User account not found.', 'error');
    return;
  }

  if (user.password !== currentPassword) {
    showMessage(userManagerMessage, 'Current password is incorrect.', 'error');
    return;
  }

  user.password = newPassword;
  localStorage.setItem('hotelAppUsers', JSON.stringify(users));
  renderUserManager();
  showMessage(userManagerMessage, `✓ Password updated for '${userId}'.`, 'success');
}

function setupLogin() {
  if (mainNav) {
    mainNav.classList.toggle('hidden', !isAuthenticated);
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const loginId = document.getElementById('loginId').value.trim();
      const loginPassword = document.getElementById('loginPassword').value;

      if (isValidLogin(loginId, loginPassword)) {
        isAuthenticated = true;
        currentUserId = loginId;
        localStorage.setItem('hotelAppAuth', 'true');
        localStorage.setItem('hotelAppUser', loginId);
        if (mainNav) {
          mainNav.classList.remove('hidden');
        }
        updateAdminAccess();
        loginMessage.textContent = 'Login successful. Redirecting...';
        const storedRequestedPage = localStorage.getItem('hotelAppRequestedPage');
        let desiredPage = requestedPage || storedRequestedPage || window.location.hash.slice(1);

        if (!desiredPage || desiredPage === 'login' || desiredPage === 'register') {
          desiredPage = 'home';
        }

        if (desiredPage === 'user-manager' && !isAdminUser()) {
          desiredPage = 'home';
        }

        const destination = desiredPage;
        requestedPage = null;
        localStorage.removeItem('hotelAppRequestedPage');
        showPage(destination);
      } else {
        loginMessage.textContent = 'Invalid ID or password.';
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const registerId = document.getElementById('registerId').value.trim();
      const registerPassword = document.getElementById('registerPassword').value;
      const registerPasswordConfirm = document.getElementById('registerPasswordConfirm').value;

      if (!registerId || !registerPassword || !registerPasswordConfirm) {
        registerMessage.textContent = 'Please complete all fields.';
        return;
      }

      if (registerPassword !== registerPasswordConfirm) {
        registerMessage.textContent = 'Passwords do not match.';
        return;
      }

      const users = getSavedUsers();
      if (registerId === 'admin' || users.some((user) => user.id === registerId)) {
        registerMessage.textContent = 'This ID is already taken.';
        return;
      }

      saveNewUser(registerId, registerPassword);
      registerForm.reset();
      loginMessage.textContent = 'Account created. Please login now.';
      showPage('login');
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      isAuthenticated = false;
      currentUserId = null;
      requestedPage = null;
      localStorage.removeItem('hotelAppAuth');
      localStorage.removeItem('hotelAppUser');
      localStorage.removeItem('hotelAppRequestedPage');
      if (mainNav) {
        mainNav.classList.add('hidden');
      }
      loginForm.reset();
      registerForm.reset();
      updateAdminAccess();
      showPage('login');
    });
  }
}

function showPage(pageId) {
  if (!isAuthenticated && pageId !== 'login' && pageId !== 'register') {
    requestedPage = pageId;
    localStorage.setItem('hotelAppRequestedPage', pageId);
    pageId = 'login';
  }

  if (pageId === 'user-manager' && !isAuthenticated) {
    requestedPage = pageId;
    pageId = 'login';
  }

  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-links a');

  pages.forEach((page) => {
    page.classList.toggle('active', page.id === pageId);
  });

  navLinks.forEach((link) => {
    const targetId = link.getAttribute('href').slice(1);
    link.classList.toggle('active', targetId === pageId);
  });

  if (pageId === 'user-manager') {
    renderUserManager();
  }

  if (mainNav) {
    mainNav.classList.toggle('hidden', !isAuthenticated);
  }

  if (window.location.hash !== `#${pageId}`) {
    history.replaceState(null, '', `#${pageId}`);
  }
}


async function request(path, options = {}) {
  const response = await fetch(path, options);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || 'Server error');
  }
  return response.json();
}

function starMarkup(count) {
  const stars = '★'.repeat(count) + '☆'.repeat(5 - count);
  return `<div class="review-stars">${stars}</div>`;
}

function formatRoomCategory(room) {
  return room.title.replace(' Room', '');
}

function renderRoomFilters(rooms) {
  if (!roomsFilter) return;

  const categories = rooms.reduce((acc, room) => {
    if (!acc[room.slug]) {
      acc[room.slug] = formatRoomCategory(room);
    }
    return acc;
  }, {});

  const filterButtons = [
    { slug: 'all', label: 'All' },
    ...Object.entries(categories).map(([slug, label]) => ({ slug, label })),
  ];

  roomsFilter.innerHTML = filterButtons
    .map(
      (filter) => `
        <button type="button" class="filter-chip ${currentRoomFilter === filter.slug ? 'active' : ''}" data-filter="${filter.slug}">
          ${filter.label}
        </button>
      `
    )
    .join('');

  const filterChips = roomsFilter.querySelectorAll('.filter-chip');
  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      currentRoomFilter = chip.dataset.filter;
      renderRoomFilters(roomData);
      renderRooms(roomData, currentRoomFilter);
    });
  });
}

function buildFeaturedRoomMarkup(room) {
  return `
    <span class="hero-image-label">Featured</span>
    <h3>${room.title}</h3>
    <p>${room.description}</p>
    <div class="hero-image-meta">
      <span>From $${room.price}/night</span>
      <span>${room.extra || 'Premium stay experience'}</span>
    </div>
  `;
}

function initFeaturedRoomSlider(rooms) {
  const featuredCard = document.getElementById('featuredRoomCard');
  const featuredDots = document.getElementById('featuredRoomDots');
  if (!featuredCard || !featuredDots || !rooms.length) return;

  const featuredRooms = rooms.map((room) => ({
    ...room,
    extra:
      room.slug === 'standard'
        ? 'Cozy comfort with city views'
        : room.slug === 'deluxe'
        ? 'Balcony view with breakfast included'
        : room.slug === 'suite'
        ? 'Living area plus premium service'
        : room.slug === 'family'
        ? 'Room for the whole family'
        : 'Penthouse luxury with private terrace',
  }));

  let currentFeaturedIndex = 0;
  const setFeaturedIndex = (index) => {
    currentFeaturedIndex = index % featuredRooms.length;
    const room = featuredRooms[currentFeaturedIndex];
    featuredCard.innerHTML = buildFeaturedRoomMarkup(room);
    featuredCard.classList.remove('animate');
    void featuredCard.offsetWidth;
    featuredCard.classList.add('animate');

    featuredDots.innerHTML = featuredRooms
      .map(
        (room, idx) => `
          <button
            type="button"
            class="${idx === currentFeaturedIndex ? 'active' : ''}"
            data-index="${idx}"
            style="background-image: url('${encodeURI(room.image || '')}');"
            aria-label="View ${room.title}"
            title="${room.title}"
          ></button>
        `
      )
      .join('');

    featuredDots.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.index);
        setFeaturedIndex(index);
      });
    });
  };

  setFeaturedIndex(0);
  setInterval(() => {
    setFeaturedIndex((currentFeaturedIndex + 1) % featuredRooms.length);
  }, 10000);
}

function renderRooms(rooms, filter = 'all') {
  const visibleRooms = filter === 'all' ? rooms : rooms.filter((room) => room.slug === filter);

  roomsGrid.innerHTML = visibleRooms
    .map(
      (room) => `
        <article class="card ${room.slug === 'deluxe' ? 'card-highlight' : ''}">
          <span class="room-category">${formatRoomCategory(room)}</span>
          <div class="room-image ${room.slug}" style="background-image: url('${room.image || ''}')"></div>
          <h3>${room.title}</h3>
          <p>${room.description}</p>
          <div class="card-meta">
            <span>From $${room.price}/night</span>
            <span>${room.capacity} guests</span>
          </div>
        </article>
      `
    )
    .join('');

  roomTypeSelect.innerHTML = rooms
    .map((room) => `<option value="${room.slug}">${room.title}</option>`)
    .join('');
}

function renderReviews(reviews, sort = 'newest') {
  const sortedReviews = [...reviews];
  if (sort === 'highest') {
    sortedReviews.sort((a, b) => b.stars - a.stars || b.id - a.id);
  } else if (sort === 'author') {
    sortedReviews.sort((a, b) => a.author.localeCompare(b.author));
  } else {
    sortedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  reviewsGrid.innerHTML = sortedReviews
    .map(
      (review) => `
        <article class="review-card">
          ${starMarkup(review.stars)}
          <h3>${review.title}</h3>
          <p>"${review.message}"</p>
          <div class="review-footer">
            <span>- ${review.author}</span>
            ${review.createdAt ? `<span class="review-date">${formatDate(review.createdAt)}</span>` : ''}
          </div>
        </article>
      `
    )
    .join('');
}

function renderReviewManager(reviews) {
  if (!reviews.length) {
    reviewManageList.innerHTML = '<p>No reviews yet.</p>';
    return;
  }

  reviewManageList.innerHTML = reviews
    .map(
      (review) => `
        <div class="manage-item" data-id="${review.id}">
          <div class="booking-header">
            <div>
              <h4>${review.title}</h4>
              <p>${starMarkup(review.stars)}</p>
            </div>
            <div class="manager-actions">
              <button class="small-button edit-review" data-id="${review.id}">Edit</button>
              <button class="small-button delete-review" data-id="${review.id}">Delete</button>
            </div>
          </div>
          <p>"${review.message}"</p>
          <p>- ${review.author}</p>
          <form class="review-edit hidden" data-id="${review.id}">
            <div class="field-group">
              <label>Name</label>
              <input type="text" name="author" value="${review.author}" required />
            </div>
            <div class="field-group">
              <label>Title</label>
              <input type="text" name="title" value="${review.title}" required />
            </div>
            <div class="field-group">
              <label>Stars</label>
              <select name="stars">
                <option value="5" ${review.stars === 5 ? 'selected' : ''}>5</option>
                <option value="4" ${review.stars === 4 ? 'selected' : ''}>4</option>
                <option value="3" ${review.stars === 3 ? 'selected' : ''}>3</option>
                <option value="2" ${review.stars === 2 ? 'selected' : ''}>2</option>
                <option value="1" ${review.stars === 1 ? 'selected' : ''}>1</option>
              </select>
            </div>
            <div class="field-group">
              <label>Message</label>
              <textarea name="message" rows="3" required>${review.message}</textarea>
            </div>
            <button type="submit" class="small-button save-review">Save</button>
            <button type="button" class="small-button cancel-edit">Cancel</button>
          </form>
        </div>
      `
    )
    .join('');

  document.querySelectorAll('.edit-review').forEach((button) => {
    button.addEventListener('click', handleReviewEdit);
  });

  document.querySelectorAll('.delete-review').forEach((button) => {
    button.addEventListener('click', handleReviewDelete);
  });

  document.querySelectorAll('.review-edit').forEach((form) => {
    form.addEventListener('submit', handleReviewSave);
    form.querySelector('.cancel-edit').addEventListener('click', () => {
      form.classList.add('hidden');
    });
  });
}

function renderStaffManager(staff) {
  if (!staff.length) {
    staffManageList.innerHTML = '<p>No staff members yet.</p>';
    return;
  }

  staffManageList.innerHTML = staff
    .map(
      (member) => {
        const status = member.status || 'Available';
        const statusClass = status.toLowerCase().replace(/\s+/g, '-');
        return `
        <div class="manage-item" data-id="${member.id}">
          <div class="booking-header">
            <div>
              <h4>${member.name}</h4>
              <p>${member.role}</p>
              <span class="status-badge ${statusClass}">${status}</span>
            </div>
            <div class="manager-actions">
              <button type="button" class="small-button edit-staff" data-id="${member.id}">Edit</button>
              <button type="button" class="small-button delete-staff" data-id="${member.id}">Delete</button>
            </div>
          </div>
          <form class="staff-edit hidden" data-id="${member.id}">
            <div class="field-group">
              <label>Name</label>
              <input type="text" name="name" value="${member.name}" required />
            </div>
            <div class="field-group">
              <label>Role</label>
              <input type="text" name="role" value="${member.role}" required />
            </div>
            <div class="field-group">
              <label>Status</label>
              <select name="status">
                <option value="Available" ${status === 'Available' ? 'selected' : ''}>Available</option>
                <option value="On Duty" ${status === 'On Duty' ? 'selected' : ''}>On Duty</option>
                <option value="On Break" ${status === 'On Break' ? 'selected' : ''}>On Break</option>
                <option value="Training" ${status === 'Training' ? 'selected' : ''}>Training</option>
              </select>
            </div>
            <button type="submit" class="small-button save-staff">Save</button>
            <button type="button" class="small-button cancel-edit">Cancel</button>
          </form>
        </div>
      `;
      }
    )
    .join('');

  document.querySelectorAll('.edit-staff').forEach((button) => {
    button.addEventListener('click', handleStaffEdit);
  });

  document.querySelectorAll('.delete-staff').forEach((button) => {
    button.addEventListener('click', handleStaffDelete);
  });

  document.querySelectorAll('.staff-edit').forEach((form) => {
    form.addEventListener('submit', handleStaffSave);
    form.querySelector('.cancel-edit').addEventListener('click', () => {
      form.classList.add('hidden');
    });
  });
}

async function loadReviewManager() {
  if (!reviewManageList) return;
  showLoadingSpinner(reviewManageList);
  try {
    const reviews = await request('/api/v1/reviews');
    renderReviewManager(reviews);
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    reviewManageList.innerHTML = `<div class="error-container"><span class="error-icon">⚠️</span> ${friendlyError}</div>`;
  }
}

async function loadStaffManager() {
  if (!staffManageList) return;
  showLoadingSpinner(staffManageList);
  try {
    const staff = await request('/api/v1/staff');
    renderStaffManager(staff);
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    staffManageList.innerHTML = `<div class="error-container"><span class="error-icon">⚠️</span> ${friendlyError}</div>`;
  }
}

async function loadServiceManager() {
  if (!serviceManageList) return;
  showLoadingSpinner(serviceManageList);
  try {
    const services = await request('/api/v1/services');
    renderServiceManager(services);
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    serviceManageList.innerHTML = `<div class="error-container"><span class="error-icon">⚠️</span> ${friendlyError}</div>`;
  }
}

function renderServiceManager(services) {
  if (!serviceManageList) return;
  if (!services.length) {
    serviceManageList.innerHTML = '<p>No services yet.</p>';
    return;
  }

  serviceManageList.innerHTML = services
    .map(
      (service) => `
        <div class="manage-item" data-id="${service.id}">
          <div class="booking-header">
            <div>
              <h4>${service.name}</h4>
              <p>${service.description}</p>
            </div>
            <div class="manager-actions">
              <button type="button" class="small-button edit-service" data-id="${service.id}">Edit</button>
              <button type="button" class="small-button delete-service" data-id="${service.id}">Delete</button>
            </div>
          </div>
          <form class="service-edit hidden" data-id="${service.id}">
            <div class="field-group">
              <label>Name</label>
              <input type="text" name="name" value="${service.name}" required />
            </div>
            <div class="field-group">
              <label>Description</label>
              <textarea name="description" rows="3" required>${service.description}</textarea>
            </div>
            <button type="submit" class="small-button save-service">Save</button>
            <button type="button" class="small-button cancel-edit">Cancel</button>
          </form>
        </div>
      `
    )
    .join('');
}

async function loadFoodManager() {
  if (!foodManageList) return;
  if (!foodData.length) {
    foodManageList.innerHTML = '<p>Loading food items...</p>';
    return;
  }
  renderFoodManager(foodData);
  renderFoodPage();
}

function renderFoodManager(foods) {
  if (!foodManageList) return;
  if (!foods.length) {
    foodManageList.innerHTML = '<p>No food items available.</p>';
    return;
  }

  foodManageList.innerHTML = foods
    .map(
      (food) => `
        <div class="manage-item" data-id="${food.slug}">
          <div class="booking-header">
            <div>
              <h4>${food.title}</h4>
              <p>${food.description}</p>
              <small>Price: $${food.price} • Category: ${food.category}</small>
            </div>
            <div class="manager-actions">
              <button type="button" class="small-button edit-food" data-id="${food.slug}">Edit</button>
              <button type="button" class="small-button delete-food" data-id="${food.slug}">Delete</button>
            </div>
          </div>

          <form class="manage-edit hidden" data-id="${food.slug}">
            <div class="field-group">
              <label>Name</label>
              <input type="text" name="title" value="${food.title}" required />
            </div>
            <div class="field-group">
              <label>Description</label>
              <textarea name="description" rows="3" required>${food.description}</textarea>
            </div>
            <div class="field-group">
              <label>Price</label>
              <input type="number" name="price" value="${food.price}" required />
            </div>
            <div class="field-group">
              <label>Capacity</label>
              <input type="number" name="capacity" value="${food.capacity}" required />
            </div>
            <div class="field-group">
              <label>Image URL</label>
              <input type="text" name="image" value="${food.image || ''}" />
            </div>
            <button type="submit" class="small-button save-food">Save</button>
            <button type="button" class="small-button cancel-edit">Cancel</button>
          </form>
        </div>
      `
    )
    .join('');
}

function setupFoodManagerEvents() {
  if (!foodManageList) return;

  foodManageList.addEventListener('click', (event) => {
    const editButton = event.target.closest('.edit-food');
    if (editButton) {
      handleFoodEdit(event);
      return;
    }

    const deleteButton = event.target.closest('.delete-food');
    if (deleteButton) {
      handleFoodDelete(event);
      return;
    }

    const cancelButton = event.target.closest('.cancel-edit');
    if (cancelButton) {
      event.preventDefault();
      const form = cancelButton.closest('.manage-edit');
      if (form) form.classList.add('hidden');
    }
  });

  foodManageList.addEventListener('submit', (event) => {
    const form = event.target.closest('.manage-edit');
    if (form) {
      handleFoodSave(event);
    }
  });
}

function handleFoodEdit(event) {
  event.preventDefault();
  const button = event.target.closest('.edit-food');
  if (!button) return;
  const item = button.closest('.manage-item');
  if (!item) return;
  const form = item.querySelector('.manage-edit');
  if (!form) return;

  document.querySelectorAll('.manage-edit').forEach((editForm) => {
    if (editForm !== form) {
      editForm.classList.add('hidden');
    }
  });

  form.classList.toggle('hidden');
}

function handleFoodDelete(event) {
  const foodSlug = event.target.dataset.id;
  const index = foodData.findIndex((item) => item.slug === foodSlug);
  if (index === -1) return;

  foodData.splice(index, 1);
  renderFoodManager(foodData);
  renderFoodPage();
  showMessage(foodManageMessage, '✓ Food item has been removed from the menu.', 'success');
}

function handleFoodSave(event) {
  event.preventDefault();
  const form = event.target.closest('.manage-edit');
  if (!form) return;
  const foodSlug = form.dataset.id;
  const food = foodData.find((item) => item.slug === foodSlug);
  if (!food) return;

  const formData = new FormData(form);
  const title = formData.get('title').trim();
  const description = formData.get('description').trim();
  const price = Number(formData.get('price'));
  const capacity = Number(formData.get('capacity'));
  const image = formData.get('image').trim();

  if (!title || !description || !price || !capacity) {
    showMessage(foodManageMessage, 'Please complete all food fields.', 'error');
    return;
  }

  food.title = title;
  food.description = description;
  food.price = price;
  food.capacity = capacity;
  food.image = image || food.image;

  renderFoodManager(foodData);
  renderFoodPage();
  showMessage(foodManageMessage, '✓ Food item updated successfully.', 'success');
}

function setupServiceManagerEvents() {
  if (!serviceManageList) return;

  serviceManageList.addEventListener('click', (event) => {
    const editButton = event.target.closest('.edit-service');
    if (editButton) {
      handleServiceEdit(event);
      return;
    }

    const deleteButton = event.target.closest('.delete-service');
    if (deleteButton) {
      handleServiceDelete(event);
      return;
    }

    const cancelButton = event.target.closest('.cancel-edit');
    if (cancelButton) {
      event.preventDefault();
      const form = cancelButton.closest('.service-edit');
      if (form) form.classList.add('hidden');
    }
  });

  serviceManageList.addEventListener('submit', (event) => {
    const form = event.target.closest('.service-edit');
    if (form) {
      handleServiceSave(event);
    }
  });
}

function handleReviewEdit(event) {
  const reviewId = event.target.dataset.id;
  const item = document.querySelector(`.manage-item[data-id="${reviewId}"]`);
  const form = item.querySelector('.review-edit');
  form.classList.toggle('hidden');
}

async function handleReviewDelete(event) {
  const reviewId = event.target.dataset.id;
  try {
    showMessage(reviewManageMessage, '⏳ Deleting review...', 'warning');
    await request(`/api/v1/reviews/${reviewId}`, { method: 'DELETE' });
    showMessage(reviewManageMessage, '✓ Review deleted successfully', 'success');
    loadReviews();
    loadReviewManager();
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    showMessage(reviewManageMessage, friendlyError, 'error');
  }
}

async function handleReviewSave(event) {
  event.preventDefault();
  const form = event.target;
  const reviewId = form.dataset.id;
  const formData = new FormData(form);
  const author = formData.get('author').trim();
  const title = formData.get('title').trim();
  const stars = Number(formData.get('stars'));
  const message = formData.get('message').trim();

  if (!author || !title || !stars || !message) {
    showMessage(reviewManageMessage, 'Please complete all review fields.', 'error');
    return;
  }

  try {
    showMessage(reviewManageMessage, '⏳ Saving review...', 'warning');
    await request(`/api/v1/reviews/${reviewId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, title, stars, message }),
    });
    showMessage(reviewManageMessage, '✓ Review updated successfully', 'success');
    loadReviews();
    loadReviewManager();
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    showMessage(reviewManageMessage, friendlyError, 'error');
  }
}

function handleStaffEdit(event) {
  event.preventDefault();
  const button = event.currentTarget;
  const item = button.closest('.manage-item');
  if (!item) return;
  const form = item.querySelector('.staff-edit');
  if (!form) return;

  document.querySelectorAll('.staff-edit').forEach((editForm) => {
    if (editForm !== form) {
      editForm.classList.add('hidden');
    }
  });

  form.classList.toggle('hidden');
}

async function handleStaffDelete(event) {
  const staffId = event.target.dataset.id;
  try {
    showMessage(staffManageMessage, '⏳ Deleting staff member...', 'warning');
    await request(`/api/v1/staff/${staffId}`, { method: 'DELETE' });
    showMessage(staffManageMessage, '✓ Staff member deleted successfully', 'success');
    loadStaff();
    loadStaffManager();
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    showMessage(staffManageMessage, friendlyError, 'error');
  }
}

async function handleStaffSave(event) {
  event.preventDefault();
  const form = event.target;
  const staffId = form.dataset.id;
  const formData = new FormData(form);
  const name = formData.get('name').trim();
  const role = formData.get('role').trim();
  const status = formData.get('status')?.trim();

  if (!name || !role || !status) {
    showMessage(staffManageMessage, 'Please complete all staff fields.', 'error');
    return;
  }

  try {
    showMessage(staffManageMessage, '⏳ Saving staff...', 'warning');
    await request(`/api/v1/staff/${staffId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role, status }),
    });
    showMessage(staffManageMessage, '✓ Staff member updated successfully', 'success');
    loadStaff();
    loadStaffManager();
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    showMessage(staffManageMessage, friendlyError, 'error');
  }
}

function handleServiceEdit(event) {
  event.preventDefault();
  const button = event.target.closest('.edit-service');
  if (!button) return;
  const item = button.closest('.manage-item');
  if (!item) return;
  const form = item.querySelector('.service-edit');
  if (!form) return;

  document.querySelectorAll('.service-edit').forEach((editForm) => {
    if (editForm !== form) {
      editForm.classList.add('hidden');
    }
  });

  form.classList.toggle('hidden');
}

async function handleServiceDelete(event) {
  const serviceId = event.target.dataset.id;
  try {
    showMessage(serviceManageMessage, '⏳ Deleting service...', 'warning');
    await request(`/api/v1/services/${serviceId}`, { method: 'DELETE' });
    showMessage(serviceManageMessage, '✓ Service deleted successfully', 'success');
    loadServices();
    loadServiceManager();
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    showMessage(serviceManageMessage, friendlyError, 'error');
  }
}

async function handleServiceSave(event) {
  event.preventDefault();
  const form = event.target;
  const serviceId = form.dataset.id;
  const formData = new FormData(form);
  const name = formData.get('name').trim();
  const description = formData.get('description').trim();

  if (!name || !description) {
    showMessage(serviceManageMessage, 'Please complete all service fields.', 'error');
    return;
  }

  try {
    showMessage(serviceManageMessage, '⏳ Saving service...', 'warning');
    await request(`/api/v1/services/${serviceId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    showMessage(serviceManageMessage, '✓ Service updated successfully', 'success');
    const editForm = event.target.closest('.service-edit');
    if (editForm) {
      editForm.classList.add('hidden');
    }
    loadServices();
    loadServiceManager();
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    showMessage(serviceManageMessage, friendlyError, 'error');
  }
}

function getStaffImagePath(role) {
  const roleImageMap = {
    'CEO': 'image person/CEO.jpg',
    'Guest Services': 'image person/Guest Services Room.Jpg',
    'Concierge': 'image person/Concierge.jpg',
    'Receptionist': 'image person/Receptionist.jpg',
    'Housekeeping Supervisor': 'image person/Housekeeping Supervisor.jpg',
    'Food & Beverage Coordinator': 'image person/Food & Beverage Coordinator Staff.Jpg'
  };
  return roleImageMap[role] || 'image person/CEO.jpg';
}

function renderStaff(staff) {
  staffGrid.innerHTML = staff
    .map(
      (member) => {
        const statusClass = member.status
          ? member.status.toLowerCase().replace(/\s+/g, '-')
          : 'available';
        const imagePath = getStaffImagePath(member.role);
        return `
        <article class="staff-card">
          <div class="staff-avatar" style="background-image: url('${imagePath}');"></div>
          <h3>${member.name}</h3>
          <p>${member.role}</p>
          <span class="status-badge ${statusClass}">${member.status || 'Available'}</span>
        </article>
      `;
      }
    )
    .join('');
}

function renderServices(services) {
  if (!serviceGrid) return;
  serviceGrid.innerHTML = services
    .map(
      (service) => {
        const categoryLabel = service.category || 'Service';
        return `
        <article class="card service-card">
          <div class="service-icon">${categoryLabel.charAt(0)}</div>
          <h3>${service.name}</h3>
          <p>${service.description}</p>
        </article>
      `;
      }
    )
    .join('');
}

async function loadServices() {
  if (!serviceGrid) return;
  if (!currentGuestId) {
    serviceAccessGate.classList.remove('hidden');
    serviceContent.classList.add('hidden');
    return;
  }
  
  showLoadingSpinner(serviceGrid);
  try {
    const services = await request('/api/v1/services');
    renderServices(services);
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    serviceGrid.innerHTML = `<div class="error-container"><span class="error-icon">⚠️</span> ${friendlyError}</div>`;
  }
}

async function loadRooms() {
  if (!roomsGrid) return;
  showLoadingSpinner(roomsGrid);
  try {
    roomData = await request('/api/v1/rooms');
    currentRoomFilter = 'all';
    renderRoomFilters(roomData);
    renderRooms(roomData, currentRoomFilter);
    initFeaturedRoomSlider(roomData);
    loadFoodManager();
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    roomsGrid.innerHTML = `<div class="error-container"><span class="error-icon">⚠️</span> ${friendlyError}</div>`;
  }
}

async function loadReviews() {
  if (!reviewsGrid) return;
  showLoadingSpinner(reviewsGrid);
  try {
    const reviews = await request('/api/v1/reviews');
    const sortOption = reviewSortSelect ? reviewSortSelect.value : 'newest';
    renderReviews(reviews, sortOption);
    loadDashboard();
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    reviewsGrid.innerHTML = `<div class="error-container"><span class="error-icon">⚠️</span> ${friendlyError}</div>`;
  }
}

async function loadStaff() {
  if (!staffGrid) return;
  showLoadingSpinner(staffGrid);
  try {
    const staff = await request('/api/v1/staff');
    renderStaff(staff);
    loadDashboard();
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    staffGrid.innerHTML = `<div class="error-container"><span class="error-icon">⚠️</span> ${friendlyError}</div>`;
  }
}

async function loadDashboard() {
  if (!dashboardStats) return;

  showLoadingSpinner(dashboardStats);
  try {
    const [bookings, reviews, staff] = await Promise.all([
      request('/api/v1/bookings'),
      request('/api/v1/reviews'),
      request('/api/v1/staff'),
    ]);

    const today = new Date();
    const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const todaysCheckins = bookings.filter((booking) => booking.checkin?.slice(0, 10) === localToday).length;

    dashboardStats.innerHTML = `
      <div class="stat-card">
        <h3>Total bookings</h3>
        <p>${bookings.length}</p>
      </div>
      <div class="stat-card">
        <h3>Total reviews</h3>
        <p>${reviews.length}</p>
      </div>
      <div class="stat-card">
        <h3>Staff members</h3>
        <p>${staff.length}</p>
      </div>
      <div class="stat-card">
        <h3>Today's check-ins</h3>
        <p>${todaysCheckins}</p>
      </div>
    `;
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    dashboardStats.innerHTML = `<div class="error-container"><span class="error-icon">⚠️</span> ${friendlyError}</div>`;
  }
}

function renderBookings(bookings) {
  if (!bookings.length) {
    bookingList.innerHTML = '<p>No confirmed bookings yet.</p>';
    return;
  }

  bookingList.innerHTML = bookings
    .map(
      (booking) => `
        <div class="booking-item" data-id="${booking.id}">
          <div class="booking-header">
            <div>
              <h4>${booking.roomName}</h4>
              <p><strong>Guest:</strong> ${booking.guestName || 'N/A'} (ID: ${booking.guestId || 'N/A'})</p>
              <p><strong>Room ID:</strong> ${booking.roomId || 'N/A'}</p>
              <p>${booking.checkin} → ${booking.checkout}</p>
            </div>
            <div class="manager-actions">
              <button class="small-button edit-booking" data-id="${booking.id}">Edit</button>
              <button class="small-button delete-booking" data-id="${booking.id}">Delete</button>
            </div>
          </div>
          <p>Guests: ${booking.guests} • Nights: ${booking.nights} • Total: $${booking.totalCost}</p>
          <form class="booking-edit hidden" data-id="${booking.id}">
          <div class="field-group">
              <label>Guest Name</label>
              <input type="text" name="guestName" value="${booking.guestName || ''}" required />
            </div>
            <div class="field-group">
              <label>Guest ID</label>
              <input type="text" name="guestId" value="${booking.guestId || ''}" required />
            </div>
            <div class="field-group">
              <label>Room ID</label>
              <input type="number" name="roomId" value="${booking.roomId || ''}" min="1" max="5" required />
            </div>
            <div class="field-group">
              <label>Check-in</label>
              <input type="date" name="checkin" value="${booking.checkin}" required />
            </div>
            <div class="field-group">
              <label>Check-out</label>
              <input type="date" name="checkout" value="${booking.checkout}" required />
            </div>
            <div class="field-group horizontal">
              <div>
                <label>Guests</label>
                <input type="number" name="guests" value="${booking.guests}" min="1" required />
              </div>
              <div>
                <label>Room type</label>
                <input type="text" name="roomType" value="${booking.roomType}" required />
              </div>
            </div>
            <button type="submit" class="small-button save-booking">Save</button>
            <button type="button" class="small-button cancel-edit">Cancel</button>
          </form>
        </div>
      `
    )
    .join('');

  document.querySelectorAll('.edit-booking').forEach((button) => {
    button.addEventListener('click', handleBookingEdit);
  });

  document.querySelectorAll('.delete-booking').forEach((button) => {
    button.addEventListener('click', handleBookingDelete);
  });

  document.querySelectorAll('.booking-edit').forEach((form) => {
    form.addEventListener('submit', handleBookingSave);
    const cancelButton = form.querySelector('.cancel-edit');
    cancelButton.addEventListener('click', () => {
      form.classList.add('hidden');
    });
  });
}

function renderBookingOverview(bookings) {
  if (!bookingOverview) return;

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalCost, 0);
  const upcoming = bookings
    .map((booking) => ({
      ...booking,
      checkinDate: new Date(booking.checkin),
    }))
    .filter((booking) => booking.checkinDate >= new Date())
    .sort((a, b) => a.checkinDate - b.checkinDate);

  const nextArrival = upcoming.length ? formatDate(upcoming[0].checkin) : 'None';
  const upcomingCount = upcoming.length;

  bookingOverview.innerHTML = `
    <div class="stat-card">
      <h3>Total bookings</h3>
      <p>${totalBookings}</p>
    </div>
    <div class="stat-card">
      <h3>Total revenue</h3>
      <p>$${totalRevenue}</p>
    </div>
    <div class="stat-card">
      <h3>Upcoming check-ins</h3>
      <p>${upcomingCount}</p>
    </div>
    <div class="stat-card">
      <h3>Next arrival</h3>
      <p>${nextArrival}</p>
    </div>
  `;
}

async function loadBookings() {
  if (!bookingList) return;
  showLoadingSpinner(bookingList);
  try {
    const bookings = await request('/api/v1/bookings');
    renderBookingOverview(bookings);
    renderBookings(bookings);
    loadDashboard();
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    bookingList.innerHTML = `<div class="error-container"><span class="error-icon">⚠️</span> ${friendlyError}</div>`;
  }
}

function handleBookingEdit(event) {
  const bookingId = event.target.dataset.id;
  const bookingItem = document.querySelector(`.booking-item[data-id="${bookingId}"]`);
  const editForm = bookingItem.querySelector('.booking-edit');
  editForm.classList.toggle('hidden');
}

async function handleBookingDelete(event) {
  const bookingId = event.target.dataset.id;
  try {
    await request(`/api/v1/bookings/${bookingId}`, {
      method: 'DELETE',
    });
    showMessage(bookingMessage, '✓ Booking deleted successfully', 'success');
    loadBookings();
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    showMessage(bookingMessage, friendlyError, 'error');
  }
}

async function handleBookingSave(event) {
  event.preventDefault();
  const form = event.target;
  const bookingId = form.dataset.id;
  const formData = new FormData(form);
  const checkin = formData.get('checkin');
  const checkout = formData.get('checkout');
  const guests = Number(formData.get('guests'));
  const roomType = formData.get('roomType');
  const guestName = formData.get('guestName');
  const guestId = formData.get('guestId');
  const roomId = Number(formData.get('roomId'));

  if (!checkin || !checkout || !guests || !roomType || !guestName || !guestId || !roomId) {
    showMessage(bookingMessage, 'Please fill out all booking fields.', 'error');
    return;
  }

  if (roomId < 1 || roomId > 5 || !Number.isInteger(roomId)) {
    showMessage(bookingMessage, 'Room ID must be a number between 1 and 5.', 'error');
    return;
  }

  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  if (checkoutDate <= checkinDate) {
    showMessage(bookingMessage, 'Check-out date must be after check-in date.', 'error');
    return;
  }

  try {
    showMessage(bookingMessage, '⏳ Updating booking...', 'warning');
    const nights = Math.round((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    const room = await request('/api/v1/rooms');
    const roomInfo = room.find((item) => item.slug === roomType);
    const totalCost = roomInfo ? roomInfo.price * nights : 0;

    await request(`/api/v1/bookings/${bookingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomName: roomInfo ? roomInfo.title : roomType,
        roomType,
        roomId,
        guestName,
        guestId,
        checkin,
        checkout,
        guests,
        nights,
        totalCost,
      }),
    });
    showMessage(bookingMessage, '✓ Booking updated successfully', 'success');
    loadBookings();
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    showMessage(bookingMessage, friendlyError, 'error');
  }
}

hotelForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const guestName = document.getElementById('guestName').value.trim();
  const guestId = document.getElementById('guestId').value.trim();
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const guests = Number(document.getElementById('guests').value);
  const roomId = Number(document.getElementById('roomId').value);
  const roomType = document.getElementById('roomType').value;

  if (!guestName || !guestId || !checkin || !checkout || !guests || !roomId || !roomType) {
    resultText.textContent = 'Please fill out all fields.';
    resultSection.classList.remove('hidden');
    return;
  }

  if (roomId < 1 || roomId > 5 || !Number.isInteger(roomId)) {
    resultText.textContent = 'Room ID must be a number between 1 and 5.';
    resultSection.classList.remove('hidden');
    return;
  }

  try {
    resultText.innerHTML = '<div class="loading-state"><div class="loading-spinner"></div><span>Checking availability...</span></div>';
    resultSection.classList.remove('hidden');
    
    const data = await request('/api/v1/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkin, checkout, guests, roomId, roomType }),
    });
    resultText.innerHTML = data.message;
    resultSection.classList.remove('hidden');
    confirmMessage.textContent = '';
    confirmBooking.disabled = false;

    if (data.available) {
      latestBooking = data;
      latestBooking.guestName = guestName;
      latestBooking.guestId = guestId;
      detailRoom.textContent = data.roomName;
      detailRoomId.textContent = data.roomId;
      detailCheckin.textContent = checkin;
      detailCheckout.textContent = checkout;
      detailGuests.textContent = guests;
      detailNights.textContent = data.nights;
      detailTotal.textContent = `$${data.totalCost}`;
      detailGuestName.textContent = guestName;
      detailGuestId.textContent = guestId;
      bookingDetails.classList.remove('hidden');
    } else {
      latestBooking = null;
      bookingDetails.classList.add('hidden');
    }
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    resultText.innerHTML = `<div class="error-container"><span class="error-icon">⚠️</span> ${friendlyError}</div>`;
    resultSection.classList.remove('hidden');
    bookingDetails.classList.add('hidden');
  }
});

confirmBooking.addEventListener('click', async () => {
  if (!latestBooking) {
    showMessage(confirmMessage, 'Please check availability before confirming.', 'error');
    return;
  }

  try {
    confirmMessage.textContent = '⏳ Confirming booking...';
    confirmBooking.disabled = true;
    
    await request('/api/v1/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(latestBooking),
    });
    showMessage(confirmMessage, `✓ Booking confirmed for ${latestBooking.roomName} from ${detailCheckin.textContent} to ${detailCheckout.textContent}. Guest ID: ${latestBooking.guestId}`, 'success');
    confirmBooking.disabled = true;
    loadBookings();
  } catch (error) {
    confirmBooking.disabled = false;
    const friendlyError = getFriendlyError(error);
    showMessage(confirmMessage, friendlyError, 'error');
  }
});

function setupServiceAccess() {
  if (serviceAccessForm) {
    serviceAccessForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const guestId = document.getElementById('serviceGuestId').value.trim();

      if (!guestId) {
        serviceAccessMessage.textContent = 'Please enter your Guest ID.';
        return;
      }

      currentGuestId = guestId;
      localStorage.setItem('hotelServiceGuestId', guestId);
      serviceAccessMessage.textContent = 'Access granted!';
      serviceAccessGate.classList.add('hidden');
      serviceContent.classList.remove('hidden');
      loadServices();
    });
  }

  if (serviceLogoutBtn) {
    serviceLogoutBtn.addEventListener('click', () => {
      currentGuestId = null;
      localStorage.removeItem('hotelServiceGuestId');
      serviceAccessGate.classList.remove('hidden');
      serviceContent.classList.add('hidden');
      document.getElementById('serviceGuestId').value = '';
      serviceAccessMessage.textContent = '';
    });
  }

  currentGuestId = localStorage.getItem('hotelServiceGuestId');
  if (currentGuestId) {
    serviceAccessGate.classList.add('hidden');
    serviceContent.classList.remove('hidden');
  } else {
    serviceAccessGate.classList.remove('hidden');
    serviceContent.classList.add('hidden');
  }
}

reviewForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const reviewAuthor = document.getElementById('reviewAuthor').value.trim();
  const reviewTitle = document.getElementById('reviewTitle').value.trim();
  const reviewStars = Number(document.getElementById('reviewStars').value);
  const reviewMessageInput = document.getElementById('reviewMessageInput').value.trim();

  if (!reviewAuthor || !reviewTitle || !reviewStars || !reviewMessageInput) {
    showMessage(reviewMessage, 'Please complete all review fields.', 'error');
    return;
  }

  try {
    showMessage(reviewMessage, '⏳ Saving review...', 'warning');
    await request('/api/v1/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stars: reviewStars, title: reviewTitle, message: reviewMessageInput, author: reviewAuthor }),
    });
    reviewForm.reset();
    showMessage(reviewMessage, '✓ Review added successfully', 'success');
    loadReviews();
    loadReviewManager();
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    showMessage(reviewMessage, friendlyError, 'error');
  }
});

staffForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const staffName = document.getElementById('staffName').value.trim();
  const staffRole = document.getElementById('staffRole').value.trim();
  const staffStatus = document.getElementById('staffStatus').value;

  if (!staffName || !staffRole || !staffStatus) {
    showMessage(staffMessage, 'Please complete all staff fields.', 'error');
    return;
  }

  try {
    showMessage(staffMessage, '⏳ Saving staff...', 'warning');
    await request('/api/v1/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: staffName, role: staffRole, status: staffStatus }),
    });
    staffForm.reset();
    showMessage(staffMessage, '✓ Staff member added successfully', 'success');
    loadStaff();
    loadStaffManager();
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    showMessage(staffMessage, friendlyError, 'error');
  }
});

serviceForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const serviceName = document.getElementById('serviceName').value.trim();
  const serviceDescription = document.getElementById('serviceDescription').value.trim();

  if (!serviceName || !serviceDescription) {
    showMessage(serviceMessage, 'Please complete all service fields.', 'error');
    return;
  }

  try {
    showMessage(serviceMessage, '⏳ Saving service...', 'warning');
    await request('/api/v1/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: serviceName, description: serviceDescription }),
    });
    serviceForm.reset();
    showMessage(serviceMessage, '✓ Service added successfully', 'success');
    loadServices();
    loadServiceManager();
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    showMessage(serviceMessage, friendlyError, 'error');
  }
});
