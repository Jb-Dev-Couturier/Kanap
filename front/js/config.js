let apiUrl =
  location.hostname === 'localhost' ||
  location.hostname === 'http://localhost:3000'
    ? 'http://localhost:3000'
    : 'https://les-kanaps.herokuapp.com';