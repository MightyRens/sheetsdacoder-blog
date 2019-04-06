//Get elements
const itemForm = document.getElementById("itemForm");
const itemInput = document.getElementById("itemInput");
const itemList = document.querySelector(".item-list");
const clearBtn = document.getElementById("clear-list");
const feedback = document.querySelector(".feedback");

let itemData = JSON.parse(localStorage.getItem("list")) || [];

if(itemData.length > 0) {
	itemData.forEach(function(singleItem) {
		itemList.insertAdjacentHTML("beforeend", `
		<div class="item my-3">
			<h5 class="item-name text-capitalize">${singleItem}</h5>
			<div class="item-icons">
				<a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
			</div>
		</div>`);
		handleItem(singleItem);
	});
}

//Form submission
itemForm.addEventListener("submit", function(event) {
	event.preventDefault();

	const textValue = itemInput.value;

	if(textValue === "") {
		showFeedback("Please enter a valid value", "Danger");
	} else {
		//Add item
		addItem(textValue);

		//Clear the form
		itemInput.value = "";

		//Add to item array
		itemData.push(textValue);
		//console.log(itemData);

		//Local storage
		localStorage.setItem("list", JSON.stringify(itemData));

		//Add event listerners to icons
		handleItem(textValue);
	}
});

//Show feedback function
function showFeedback(text, action) {
	feedback.classList.add("showItem", `alert-${action}`);
	feedback.innerHTML = `<p>${text}</p>`

	setTimeout(function() {
		feedback.classList.remove("showItem", `alert-${action}`);
	}, 3000)
}

//Add item function

function addItem(value) {
	const div = document.createElement("div");
	div.classList.add("item", "my-3");
	div.innerHTML = `<h5 class="item-name text-capitalize">${value}</h5>
	<div class="item-icons">
		<a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
	</div>`;
	itemList.appendChild(div);
}

function handleItem(textValue) {
	const items = itemList.querySelectorAll(".item");
	items.forEach(function(item) {
		if(item.querySelector(".item-name").textContent === textValue) {
			//Delete event listener
			item.querySelector(".delete-item").addEventListener("click", function() {
				itemList.removeChild(item);

				itemData = itemData.filter(function(item) {
					return item !== textValue;
				});
				showFeedback("Item deleted", "Succes!");
			});
		}
	});
}

clearBtn.addEventListener("click", function() {
	itemData = [];
	localStorage.removeItem("list");
	const items = itemList.querySelectorAll(".item");

	if(items.length > 0) {
		items.forEach(function(item) {
			itemList.removeChild(item);
		});
	}
});