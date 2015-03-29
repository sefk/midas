console.log('Loading... ', __filename);

/**
 * Policies are simply Express middleware functions which run before your controllers.
 * You can apply one or more policies for a given controller or action.
 *
 * Any policy file (e.g. `authenticated.js`) can be dropped into the `/policies` folder,
 * at which point it can be accessed below by its filename, minus the extension, (e.g. `authenticated`)
 *
 * For more information on policies, check out:
 * http://sailsjs.org/#documentation
 */


module.exports.policies = {

  // default require authentication
  // see api/policies/authenticated.js
  '*': ['authenticated', 'addUserId'],

  // Main rendering controller
  // Passes sspi policy through for auto-login systems
  MainController : {
    '*': ['sspi']
  },

  // Only admins can access the AdminController API
  AdminController : {
    '*': ['authenticated', 'admin']
  },

  // Auth controller can be accessed by anyone
  AuthController : {
    '*': true
  },

  // Limit user controller view to just the /user endpoint
  UserController : {
    '*': false,
    'profile': ['authenticated'],
    'photo': ['authenticated', 'requireId'],
    'info': ['authenticated', 'requireId'],
    'update': ['authenticated', 'requireUserId', 'requireId'],
    'username': ['authenticated'],
    'find': ['authenticated', 'requireUserId'],
    'findOne': ['authenticated', 'requireUserId'],
    'activities': ['authenticated'],
    'disable': ['authenticated', 'requireId', 'requireUserId'],
    'enable': ['authenticated', 'requireId', 'requireUserId', 'admin'],
    'resetPassword': ['authenticated', 'requireUserId'],
    'emailCount': ['test']
  },

  UserEmailController : {
    '*': ['authenticated', 'requireUserId'],
    'find': ['authenticated', 'requireUserId', 'requireId', 'userEmailIdMatch'],
    'findOne': ['authenticated', 'requireUserId', 'requireId', 'userEmailIdMatch'],
    'findAllByUserId': ['authenticated', 'requireUserId', 'requireId', 'user'],
    'create': ['authenticated', 'requireUserId', 'addUserId'],
    'update': ['authenticated', 'requireUserId', 'requireId', 'userEmailIdMatch'],
    'destroy': ['authenticated', 'requireUserId', 'requireId', 'userEmailIdMatch'],
  },

  UserSettingController : {
    '*': ['authenticated', 'requireUserId', 'addUserId'],
    'find': ['authenticated', 'requireUserId', 'addUserId'],
    'findOne': ['authenticated', 'requireUserId', 'addUserId'],
    'destroy': ['authenticated', 'requireUserId', 'requireId','userSettingIdMatch']
  },

  // Disable the index blueprints for FileController due to security concerns
  FileController : {
    'index': false,
    'findAll': 'admin',
    // for testing
    'test': true,
    'testupload': true,
    // everything else is protected
    '*': 'protectedFile'
  },

  ExportController : {
    'export': 'admin'
  },

  ProjectController : {
    '*': ['authenticated', 'addUserId', 'project'],
    'find': ['authenticated', 'requireId', 'project'],
    'findOne': ['authenticated', 'requireId', 'project'],
    'update': ['authenticated', 'requireUserId', 'requireId', 'project', 'ownerOrAdmin'],
    'destroy': ['authenticated', 'requireUserId', 'requireId', 'project', 'ownerOrAdmin']
  },

  ProjectOwnerController : {
    '*': false,
    'create': ['authenticated', 'requireUserId', 'projectId'],
    'destroy': ['authenticated', 'requireUserId', 'requireId']
  },

  LikeController : {
    '*': ['authenticated', 'addUserId'],
    'count': ['authenticated', 'requireId', 'project'],
    'countt': ['authenticated', 'requireId', 'task'],
    'countu': ['authenticated', 'requireId', 'requireUserId'],
    'like': ['authenticated', 'requireUserId', 'addUserId', 'requireId'],
    'liket': ['authenticated', 'requireUserId', 'addUserId', 'requireId'],
    'likeu': ['authenticated', 'requireUserId', 'addUserId', 'requireId'],
    'unlike': ['authenticated', 'requireUserId', 'addUserId', 'requireId'],
    'unliket': ['authenticated', 'requireUserId', 'addUserId', 'requireId'],
    'unlikeu': ['authenticated', 'requireUserId', 'addUserId', 'requireId'],
    'create': ['authenticated', 'requireUserId', 'addUserId'],
    'destroy': false,
    'update': false
  },

  VolunteerController : {
    '*': false,
    'create': ['authenticated', 'requireUserId', 'addUserId'],
    'destroy': ['authenticated', 'requireId', 'ownerOrAdmin'],
  },

  EventController : {
    '*': false,
    'find': ['authenticated'],
    'findOne': ['authenticated'],
    'create': ['authenticated', 'requireUserId', 'addUserId', 'projectId', 'eventUuid'],
    'update': ['authenticated', 'requireUserId', 'projectId'],
    'findAllByProjectId': ['authenticated', 'addUserId', 'requireId', 'project'],
    'attend': ['authenticated', 'requireUserId', 'addUserId', 'requireId'],
    'cancel': ['authenticated', 'requireUserId', 'addUserId', 'requireId'],
    'rsvp': ['authenticated', 'requireUserId', 'addUserId'],
    'ical': ['authenticated', 'addUserId', 'project']
  },

  TagController : {
    '*': ['authenticated'],
    'find': false,
    'findOne': false,
    'create': ['authenticated', 'requireUserId', 'projectId', 'taskId', 'ownerOrAdmin'],
    'update': false,
    'destroy': ['authenticated', 'requireUserId', 'requireId'],
    'add': ['authenticated', 'requireUserId'],
    'findAllByProjectId': ['authenticated', 'requireId', 'project'],
    'findAllByTaskId': ['authenticated', 'requireId', 'task']
    //'findAllByUserId': not needed because authenticated is default
  },

  CommentController : {
    'find': false,
    'findOne': false,
    'create': ['authenticated', 'requireUserId', 'addUserId', 'projectId', 'taskId'],
    'update': ['authenticated', 'requireUserId', 'projectId', 'taskId'],
    'destroy': ['authenticated', 'requireUserId', 'requireId'],
    'findAllByProjectId': ['authenticated', 'requireId', 'project'],
    'findAllByTaskId': ['authenticated', 'requireId', 'task']
  },

  TagEntityController : {
    // Purely for administrative functions
    '*': 'authenticated'
  },

  TaskController : {
    'find': ['authenticated', 'task'],
    'findOne': ['authenticated', 'task'],
    'findAllByProjectId': ['authenticated', 'requireId', 'project'],
    'create': ['authenticated', 'requireUserId', 'addUserId'],
    'update': ['authenticated', 'requireUserId', 'requireId', 'projectId', 'task', 'ownerOrAdmin'],
    'destroy': ['authenticated', 'requireUserId', 'requireId', 'task', 'ownerOrAdmin']
  },

  AttachmentController: {
    'find': ['authenticated', 'requireId'],
    'findOne': ['authenticated', 'requireId'],
    'findAllByProjectId': ['authenticated', 'requireId', 'project'],
    'findAllByTaskId': ['authenticated', 'requireId', 'task'],
    'create': ['authenticated', 'requireUserId', 'addUserId'],
    'update': false,
    'destroy': ['authenticated', 'requireUserId']
  },

  SearchController : {
    '*': true
  }

  /*
  // Here's an example of adding some policies to a controller
  RabbitController: {

    // Apply the `false` policy as the default for all of RabbitController's actions
    // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
    '*': false,

    // For the action `nurture`, apply the 'isRabbitMother' policy
    // (this overrides `false` above)
    nurture : 'isRabbitMother',

    // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
    // before letting any users feed our rabbits
    feed : ['isNiceToAnimals', 'hasRabbitFood']
  }
  */
};


/**
 * Here's what the `isNiceToAnimals` policy from above might look like:
 * (this file would be located at `policies/isNiceToAnimals.js`)
 *
 * We'll make some educated guesses about whether our system will
 * consider this user someone who is nice to animals.
 *
 * Besides protecting rabbits (while a noble cause, no doubt),
 * here are a few other example use cases for policies:
 *
 *  + cookie-based authentication
 *  + role-based access control
 *  + limiting file uploads based on MB quotas
 *  + OAuth
 *  + BasicAuth
 *  + or any other kind of authentication scheme you can imagine
 *
 */

/*
module.exports = function isNiceToAnimals (req, res, next) {

  // `req.session` contains a set of data specific to the user making this request.
  // It's kind of like our app's "memory" of the current user.

  // If our user has a history of animal cruelty, not only will we
  // prevent her from going even one step further (`return`),
  // we'll go ahead and redirect her to PETA (`res.redirect`).
  if ( req.session.user.hasHistoryOfAnimalCruelty ) {
    return res.redirect('http://PETA.org');
  }

  // If the user has been seen frowning at puppies, we have to assume that
  // they might end up being mean to them, so we'll
  if ( req.session.user.frownsAtPuppies ) {
    return res.redirect('http://www.dailypuppy.com/');
  }

  // Finally, if the user has a clean record, we'll call the `next()` function
  // to let them through to the next policy or our controller
  next();
};
*/
