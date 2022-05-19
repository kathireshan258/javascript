import { Modal } from './UI/Modal';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.querySelector("#locate-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler);
    addressForm.addEventListener("click", this.findAddressHandler);
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "Your current browser version doesn't support location feature, please use a mordern version of the browser"
      );
      return;
    }

    const modal = new Modal('loading-modal-content', 'Please update the brpwser version - your current browser version doesn\'t the feature');
    modal.show();
    navigator.geolocation.getCurrentPosition(
      (success) => {
        modal.hide();
        const coordinates = {
          latitude: success.coords.latitude,
          longitude: success.coords.longitude,
        };
        console.log(coordinates);
      },
      (error) => {
        modal.hide();
        alert("Please enter user location coordinates!");
      }
    );
  }
}

new PlaceFinder();