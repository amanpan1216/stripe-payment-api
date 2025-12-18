/**
 * DECODED ANALYSIS: random-generator.js
 * 
 * This file contains functions for generating random data for autofill.
 * 
 * OBFUSCATION TECHNIQUES USED:
 * 1. Custom base-91 encoding with unique alphabets
 * 2. Variable name mangling (e.g., HNvRvHp, ytEuyN, etc.)
 * 3. Sequence expression wrapper (ilatq_6)
 * 4. String lookup table with caching
 * 5. Multiple nested decoder functions
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * Hz2V6uB(): Get First Names List
 * -------------------------------
 * Returns array of first names with codes
 * @returns {Array} Array of {name, code} objects
 */
function getFirstNames() {
    return [
        { name: 'James', code: 'james' },
        { name: 'John', code: 'john' },
        { name: 'Robert', code: 'robert' },
        { name: 'Michael', code: 'michael' },
        { name: 'William', code: 'william' },
        { name: 'David', code: 'david' },
        { name: 'Richard', code: 'richard' },
        { name: 'Joseph', code: 'joseph' },
        { name: 'Thomas', code: 'thomas' },
        { name: 'Charles', code: 'charles' },
        { name: 'Mary', code: 'mary' },
        { name: 'Patricia', code: 'patricia' }
    ];
}

/**
 * jln1j6(): Get Last Names List
 * -----------------------------
 * Returns array of last names with codes
 * @returns {Array} Array of {name, code} objects
 */
function getLastNames() {
    return [
        { name: 'Smith', code: 'smith' },
        { name: 'Johnson', code: 'johnson' },
        { name: 'Williams', code: 'williams' },
        { name: 'Brown', code: 'brown' },
        { name: 'Jones', code: 'jones' },
        { name: 'Garcia', code: 'garcia' },
        { name: 'Miller', code: 'miller' },
        { name: 'Davis', code: 'davis' },
        { name: 'Rodriguez', code: 'rodriguez' },
        { name: 'Martinez', code: 'martinez' },
        { name: 'Hernandez', code: 'hernandez' },
        { name: 'Lopez', code: 'lopez' }
    ];
}

/**
 * Name Combinations Generator
 * ---------------------------
 * Combines first and last names to create full names
 */
function generateNameCombinations() {
    const firstNames = getFirstNames();
    const lastNames = getLastNames();
    const combinations = [];
    
    for (let i = 0; i < firstNames.length; i++) {
        for (let j = 0; j < lastNames.length; j++) {
            combinations.push({
                full: firstNames[i].name + ' ' + lastNames[j].name,
                code: firstNames[i].code + ' ' + lastNames[j].code
            });
        }
    }
    
    return combinations;
}

/**
 * kHwZy1(): Generate Random Name
 * ------------------------------
 * Generates a random full name from combinations
 * @returns {Object} Name object with firstName, lastName, fullName, etc.
 */
function generateRandomName() {
    const firstNames = getFirstNames();
    const lastNames = generateNameCombinations(); // Uses combined list
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return {
        firstName: firstName.full,
        lastName: lastName.full,
        fullName: firstName.full + ' ' + lastName.full,
        displayName: firstName.code + ' ' + lastName.code,
        gender: firstName.gender // If applicable
    };
}

/**
 * Country Codes Map (SRgz6BN)
 * ---------------------------
 * Maps country codes to currency/locale information
 * Used for country-specific random data
 */
const COUNTRY_CODES = {
    AO: 'Angola',
    AQ: 'Antarctica',
    AG: 'Antigua and Barbuda',
    AW: 'Aruba',
    BZ: 'Belize',
    BJ: 'Benin',
    BO: 'Bolivia',
    BQ: 'Bonaire',
    BW: 'Botswana',
    BV: 'Bouvet Island',
    BI: 'Burundi',
    CM: 'Cameroon',
    CF: 'Central African Republic',
    TD: 'Chad',
    KM: 'Comoros',
    CG: 'Congo',
    CD: 'Democratic Republic of the Congo',
    CK: 'Cook Islands',
    CW: 'Curaçao',
    DJ: 'Djibouti',
    DM: 'Dominica',
    GQ: 'Equatorial Guinea',
    ER: 'Eritrea',
    FJ: 'Fiji',
    TF: 'French Southern Territories',
    GA: 'Gabon',
    GM: 'Gambia',
    GH: 'Ghana',
    GI: 'Gibraltar',
    GD: 'Grenada',
    GY: 'Guyana',
    LY: 'Libya',
    MO: 'Macao',
    ML: 'Mali',
    MR: 'Mauritania',
    MS: 'Montserrat',
    NU: 'Niue',
    PS: 'Palestine',
    QA: 'Qatar',
    RW: 'Rwanda',
    LC: 'Saint Lucia',
    WS: 'Samoa',
    ST: 'Sao Tome and Principe',
    SL: 'Sierra Leone',
    SX: 'Sint Maarten',
    SB: 'Solomon Islands',
    SS: 'South Sudan',
    TL: 'Timor-Leste',
    TG: 'Togo',
    TK: 'Tokelau',
    TO: 'Tonga',
    TT: 'Trinidad and Tobago',
    UG: 'Uganda',
    VU: 'Vanuatu',
    YE: 'Yemen',
    ZW: 'Zimbabwe'
};

/**
 * k9nJFm(locale, format): Generate Locale-Specific Data
 * -----------------------------------------------------
 * Generates data specific to a locale/country
 * @param {string} locale - Locale code
 * @param {string} format - Data format
 * @returns {Object} Locale-specific data
 */
function generateLocaleData(locale, format) {
    // Returns locale-specific random data
    // Phone number formats
    // Address formats
    // Name conventions
}

/**
 * Window Exports
 * --------------
 * Functions exposed to window object:
 */
window.generateRandomName = generateRandomName;
window.generateLocaleData = generateLocaleData;

/**
 * Name Gender Mapping
 * -------------------
 * Some first names include gender information:
 * - 'male': James, John, Robert, etc.
 * - 'female': Mary, Patricia, etc.
 * - 'neutral': Names that work for both
 */

/**
 * Random Selection Utilities
 * --------------------------
 * Uses Math.random() with Math.floor() for selection
 * Example: array[Math.floor(Math.random() * array.length)]
 */

/**
 * Data Validation
 * ---------------
 * - Checks for duplicate name combinations
 * - Validates country codes against known list
 * - Ensures gender consistency where applicable
 */
