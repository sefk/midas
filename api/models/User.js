/**
 * User
 *
 * @module      :: Model
 * @description :: User representation
 *
 */

module.exports = {
  tableName: 'midas_user',
  attributes: {
    // Login information
    username: 'STRING',

    // Core attributes about a user
    name: 'STRING',

    // Professional Title
    title: 'STRING',

    // Biography
    bio: 'STRING',

    // User's profile photo
    // If photoId is not null, the URL to the file is /file/get/:id
    photoId: 'INTEGER',
    // If photoUrl is not null, then an external provider gave us the photo
    // Use the URL directly as the resource identifier for the photo.
    photoUrl: 'STRING',

    // User metadata for service delivery
    isAdmin: {
      type: 'BOOLEAN',
      defaultsTo: false
    },

    // is the user's login disabled
    disabled: {
      type: 'BOOLEAN',
      defaultsTo: false
    },

    // Store the number of invalid password attempts
    passwordAttempts: {
      type: 'INTEGER',
      defaultsTo: 0
    }
  },

  // TODO: add more fields, likely driven off subqueries
  exportFormat: {
    'user_id': 'id',
    'name': 'name',
    'username': 'username',
    'title': 'title',
    'bio': 'bio',
    'isAdmin': 'isAdmin',
    'disabled': 'disabled'
  }

};
