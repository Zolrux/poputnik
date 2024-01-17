"use strict";

window.addEventListener('DOMContentLoaded', () => {

	createTrip();
	verbTripPlaces();

	function createTrip() {
		const createTripBtn = document.querySelector('.header__create-trip');

		if (!createTripBtn) {
			return;
		}

		const modal = document.querySelector('.modal-create-trips');

		createTripBtn.addEventListener("click", function (e) {
			modal.classList.add('active');
			modalClose(modal);
		});
	}

	function verbTripPlaces() {
		const listOffers = document.querySelector('.trips__list-offers');
		if (!listOffers) {
			return;
		}

		listOffers.addEventListener("click", function (e) {
			const target = e.target;

			if (target.closest('.trips-list__btn')) {
				const offerBtn = target.closest('.trips-list__btn');
				const maxPlaces = +offerBtn.dataset.maxPlaces;
				const offerItem = offerBtn.closest('.trips-list__item');
				const offerId = +offerItem.dataset.offerId;
				const offerModal = offerItem.querySelector('.modal-trips');

				offerModal.classList.add('active');
				modalClose(offerModal);
				handleCounterPanel(offerModal, maxPlaces);
				sendOfferTrip(offerId, offerModal, maxPlaces);
			}
		});
	}

	function modalClose(modal) {
		const modalCloseBtn = modal.querySelector('[data-modal-create-close]') || modal.querySelector('[data-modal-offer-close]');
		modalCloseBtn.addEventListener("click", function (e) {
			modal.classList.remove('active');
		}, {once: true});
	}

	function handleCounterPanel(modal, maxPlaces) {
		const decrementBtn = modal.querySelector('.modal-trips__counter-decrement');
		const incrementBtn = modal.querySelector('.modal-trips__counter-increment');
		const value = modal.querySelector('.modal-trips__counter-value');
		
		if (!decrementBtn.hasAttribute('data-event-click')) {
			decrementBtn.dataset.eventClick = '';

			decrementBtn.addEventListener("click", () => {
				const dataValue = +value.dataset.placesValue;
				if (dataValue - 1 >= 1 && dataValue <= maxPlaces) {
					value.dataset.placesValue = +value.dataset.placesValue - 1;
				}
				setActualPrice(modal);
			});
		}
		if (!incrementBtn.hasAttribute('data-event-click')) {
			incrementBtn.dataset.eventClick = '';

			incrementBtn.addEventListener("click", () => {
				const dataValue = +value.dataset.placesValue;
				if (dataValue >= 1 && dataValue < maxPlaces) {
					value.dataset.placesValue = +value.dataset.placesValue + 1;
				}
				setActualPrice(modal);
			});
		}
	}

	function setActualPrice(modal) {
		const placesValue = +modal.querySelector('.modal-trips__counter-value').dataset.placesValue;
		const totalPrice = modal.querySelector('[data-total-price]');
		const dataInitialPriceValue = +totalPrice.dataset.initialPrice;
		
		const total = dataInitialPriceValue * placesValue;
		totalPrice.querySelector('span').textContent = total;
		totalPrice.dataset.totalPrice = total;
	}

	async function sendOfferTrip(offerId, modal, maxPlaces) {
		const sendBtn = modal.querySelector('.modal-trips__btn');
		
		sendBtn.addEventListener("click", async function (e) {
			const placesValue = +modal.querySelector('.modal-trips__counter-value').dataset.placesValue;
			const totalPrice = +modal.querySelector('.modal-trips__price-value').dataset.totalPrice;
			
			await fetch('/offer/create', {
				method: "PUT",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({offerId, places: placesValue, totalPrice, maxPlaces})
			})
			.then(async (res) => {
				const data = res.ok ? await res.json() : null;
				if (data.notClient) {
					return window.location.href = '/';
				}
				return window.location.href = '/profile/trips';
			})
		}, {once: true});

	}

});