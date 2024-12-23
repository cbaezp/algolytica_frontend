/**
 * Formats a bookie name by converting snake_case to Title Case.
 * Example: "ladbrokes_au" -> "Ladbrokes Au"
 *
 * @param {string} name - The bookie name to format.
 * @returns {string} - The formatted bookie name.
 */
export function formatBookieName(name) {
    if (!name) return "";
    return name
        .split("_") // Split the string by underscores
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(" "); // Join the words back with a space
}
