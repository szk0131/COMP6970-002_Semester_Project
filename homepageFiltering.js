// Finding the Apply Filters button and the Clear Filters button and giving them event listeners
document.getElementById("apply-filters-button").addEventListener("click", applyFilters);
document.getElementById("clear-filters-button").addEventListener("click", clearFilters);

// Getting all apartment summaries
const apartmentSummaries = document.querySelectorAll(".apartment-summary");

// Other essential constants
const hiddenClassName = "hidden";
const filterValueNotSelected = "N/A";

function applyFilters() {
    // Resets homepage to initial state so that filtering can occur correctly
    resetHomepage();

    filterByCity();
    filterByMaxPrice();

    // Update number of visible apartment summaries after applying filters
    document.getElementById("number-of-apartment-complexes-line").textContent = "Showing " + countVisibleApartmentSummaries() + " results";
}

function clearFilters() {
    resetHomepage();
    document.getElementById("number-of-apartment-complexes-line").textContent = "Showing 10 results";
    let selectElements = document.querySelectorAll("select");
    for (let i = 0; i < selectElements.length; i++) {
        selectElements[i].value = filterValueNotSelected;
    }
}

function resetHomepage() {
    for (let i = 0; i < apartmentSummaries.length; i++) {
        apartmentSummaries[i].classList.remove(hiddenClassName);
    }
}

function filterByCity() {
    let selectedCity = document.getElementById("city-filter-setting").value;
    if (selectedCity !== filterValueNotSelected) {
        for (let i = 0; i < apartmentSummaries.length; i++) {
            let location = apartmentSummaries[i].children[0];
            let address = location.children[1];
            let cityAndState = address.children[1].textContent;
            let city = cityAndState.substring(0, cityAndState.indexOf(","));
            if (city !== selectedCity) {
                apartmentSummaries[i].classList.add(hiddenClassName);
            }
        }
    }
}

function filterByMaxPrice() {
    let selectedMaxPrice = document.getElementById("max-unit-price-filter-setting").value;
    if (selectedMaxPrice !== filterValueNotSelected) {
        let selectedMaxPriceAsInt = parseInt(selectedMaxPrice.substring(1));
        for (let i = 0; i < apartmentSummaries.length; i++) {
            let apartmentSummaryBottomHalf = apartmentSummaries[i].children[2];
            let unitPriceRange = apartmentSummaryBottomHalf.children[0].textContent;
            let maxUnitPrice = unitPriceRange.substring(unitPriceRange.lastIndexOf("$") + 1);
            if (maxUnitPrice > selectedMaxPriceAsInt) {
                apartmentSummaries[i].classList.add(hiddenClassName);
            }
        }
    }
}

function countVisibleApartmentSummaries() {
    let numberOfVisibleApartmentSummaries = 0;
    for (let i = 0; i < apartmentSummaries.length; i++) {
        if (!apartmentSummaries[i].classList.contains(hiddenClassName)) {
            numberOfVisibleApartmentSummaries++;
        }
    }
    return numberOfVisibleApartmentSummaries;
}