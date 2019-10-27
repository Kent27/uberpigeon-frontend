import validate from "validate.js"

//custom password format 1 capital letter, 1 small letter, 1 digit, 1 special character
validate.validators.passwordFormat = function (value, options, key, attributes) {
  let count = 0;
  options.forEach((option) => {
    if (option.test(value)) {
      count = count + 1;
    }
  });
  if (count < 3 && value) {
    return "must have at least 3 of the following - 1 capital letter, 1 small letter, 1 digit, 1 special character!";
  }
};

validate.validators.urlCustom = function (value, options, key, attributes) {

  const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  if(!pattern.test(value)){
    return "is not a valid url";
  } 
};


export let constraints = {
  ////////////////Signup Form 
  password: {
    presence: {
      allowEmpty: false
    },     
    length: {
      minimum: 8,
      message: "must be at least 8 characters"
    },
  },
  passwordLogin: {
    presence: {
      allowEmpty: false
    },
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    },
  },
  passwordConfirmation: {
    presence: {
      allowEmpty: false
    },
    equality: "password"
  },  
  passwordEdit: {  
    length: {
      minimum: 8,
      message: "must be at least 8 characters"
    },
  },
  zip: {
    presence: {
      allowEmpty: false
    },
    format: /^[A-Za-z0-9]{3,10}$/
  },    
};

const notEmptyConstraint = ['name', 'companyName','companyId', 'userGroupId',
  'role', 'topic', 'message', 'emailLogin', /*'file',*/ 'oldPassword',
];
notEmptyConstraint.forEach((key) => {
  constraints[key] = {
    presence: {
      allowEmpty: false
    }
  }
})

const radioConstraint = ['gender'];
radioConstraint.forEach((key) => {
  constraints[key] = {
    presence: {
      allowEmpty: false,
      message: 'must be chosen'
    }
  }
})

const integerConstraint = ['interaction', 'user', 'image', 'userGroup', 'restaurant', 'type'];
integerConstraint.forEach((key) => {
  constraints[key] = {
    presence: {
      allowEmpty: false
    },
    numericality: {
      onlyInteger: true,
      strict: true,
      greaterThanOrEqualTo: 0,  
    }
  }
})

const floatConstraint = ['price'];
floatConstraint.forEach((key) => {
  constraints[key] = {
    presence: {
      allowEmpty: false
    },
    numericality: {
      strict: true,
      greaterThanOrEqualTo: 0,  
    }
  }
})

const urlConstraint = ['payloadUrl', 'website'];
urlConstraint.forEach((key) => {
  constraints[key] = {
    presence: {
      allowEmpty: false
    },
    // url: true,
    urlCustom: true,
  }
})

const phoneConstraint = ['phone', 'fax'];
phoneConstraint.forEach((key) => {
  constraints[key] = {
    presence: {
      allowEmpty: false
    },
    format: /^\+?[0-9]+$/
  }
})

const emailConstraint = ['email', 'companyEmail'];
emailConstraint.forEach((key) => {
  constraints[key] = {
    presence: {
      allowEmpty: false
    },
    email: true
  }
})