import {
  Post,
  Get
} from './service.setup';


const AddCoupon = async (token) => {
  try {
    const response = await Post("/validateBookCoupon", {
      token
    });

    if (response.data.code == "203") {
      alert(response.data.message);
      return;
    }
    if (response.data.code == "401") {
      alert(response.data.message);
      return;
    }
    return response;
  } catch (e) {
    alert("Something went wrong try latter");
    //history.goBack();
  }

}
const GetPageLimits = async () => {
  try {
    return await Get("getUserPageLimit");
  } catch (e) {

  }

}
const GetUserTransactions = async () => {
  try {
    return await Get("getUserTransactionList");
  } catch (e) {

  }

}

const SendFeedBack = async (feedback ,name) => {
  try {
    const response = await Post("/contactUs", {
      feedback , name
    })
    return response ;
  } catch (e) {
    alert("Something went wrong try latter");
    //history.goBack();
  }
}
export {
  AddCoupon,
  GetPageLimits ,
  GetUserTransactions,
  SendFeedBack

}