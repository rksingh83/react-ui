import {
  Post,
  Get
} from './service.setup';


const addContact = async (id) => {
  try {
    const userFind = await Post("/addUser", {
      id
    });
    if (userFind.data.code == "200") {
      alert(userFind.data.message);
      return true
    }
  } catch (e) {
    alert("Something went wrong try latter")
  }
}


const searchContact = async (id) => {
  try {
    if (!id) {
      alert("Please enter Email or User Id");
      return;
    }
    const userFind = await Post("/searchUser", {
      unique_user_id: id
    });

    if (userFind.data.code == "203") {
      alert(userFind.data.message);
      return;
    }
    if (userFind.data.code == "213") {
      alert(userFind.data.message);
      return;
    }
    return userFind;
  } catch (e) {
    alert("Something went wrong try latter");
    //history.goBack();
  }
};
const sendOTPToEmail = async (email) => {
  try {
    if (!email) {
      alert("Please enter Email");
      return;
    }
    const userFind = await Post("/changeEmailAddress", {
      email: email
    });

    if (userFind.data.code == "203") {
      alert(userFind.data.message);
      return;
    }
    if (userFind.data.code == "401") {
      alert(userFind.data.message);
      return;
    }

    return userFind;
  } catch (e) {
    alert("Something went wrong try latter");
    //history.goBack();
  }
};
const EmailVerification = async (email, otp) => {
  try {
    if (!otp) {
      alert("Please enter Email");
      return;
    }
    const userFind = await Post("/emailOrphoneChangedVerification", {
      email: email,
      emailOtp: otp
    });

    if (userFind.data.code == "203") {
      alert(userFind.data.message);
      return;
    }
    if (userFind.data.code == "401") {
      alert(userFind.data.message);
      return;
    }
    return userFind;
  } catch (e) {
    alert("Something went wrong try latter");
    //history.goBack();
  }
};

const ChangePassword = async (currentPassword, newPassword) => {
  try {
    const response = await Post("/changePassword", {
      currentPassword,
      newPassword
    });

    if (response.data.code == "203") {
      alert(response.data.message);
      return;
    }
    if (response.data.code == "401") {
      alert(response.data.error);
      return false;
    }
    return response;
  } catch (e) {
    alert("Something went wrong try latter");
    //history.goBack();
  }

}

export {
  searchContact,
  addContact,
  sendOTPToEmail,
  EmailVerification,
  ChangePassword
}