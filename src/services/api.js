const API_BASE = 'http://localhost/job-application-tracker/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
}

export const getApplications = () => request('/applications.php');
export const createApplication = (data) => request('/applications.php', {
  method: 'POST',
  body: JSON.stringify(data),
});
export const updateApplication = (data) => request('/applications.php', {
  method: 'PUT',
  body: JSON.stringify(data),
});
export const deleteApplication = (id) => request(`/applications.php?id=${id}`, {
  method: 'DELETE',
});

export const getWishlist = () => request('/wishlist.php');
export const createWishlistItem = (data) => request('/wishlist.php', {
  method: 'POST',
  body: JSON.stringify(data),
});
export const updateWishlistItem = (data) => request('/wishlist.php', {
  method: 'PUT',
  body: JSON.stringify(data),
});
export const deleteWishlistItem = (id) => request(`/wishlist.php?id=${id}`, {
  method: 'DELETE',
});

export const getDashboardData = () => request('/dashboard.php');
export const getAnalyticsData = () => request('/analytics.php');
