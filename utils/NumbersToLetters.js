exports.numberToFrench = (n) => {
  const units = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
  const teens = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
  const tens = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante", "quatre-vingt", "quatre-vingt"];

  function convertHundreds(num) {
    if (num === 0) return "zéro";
    let words = "";

    let hundreds = Math.floor(num / 100);
    let remainder = num % 100;

    if (hundreds > 0) {
      if (hundreds === 1) {
        words += "cent";
      } else {
        words += units[hundreds] + " cent";
        if (remainder === 0) words += "s";
      }
      if (remainder > 0) words += " ";
    }

    if (remainder > 0) {
      if (remainder < 10) {
        words += units[remainder];
      } else if (remainder < 17) {
        words += teens[remainder - 10];
      } else if (remainder < 20) {
        words += "dix-" + units[remainder - 10];
      } else if (remainder < 70) {
        let ten = Math.floor(remainder / 10);
        let unit = remainder % 10;
        words += tens[ten];
        if (unit === 1 && ten !== 8) words += " et un";
        else if (unit > 0) words += "-" + units[unit];
      } else if (remainder < 80) {
        let unit = remainder - 60;
        words += "soixante";
        if (unit === 11) words += " et onze";
        else if (unit === 10) words += "-dix";
        else if (unit < 17) words += "-" + teens[unit - 10];
        else words += "-dix-" + units[unit - 10];
      } else {
        let unit = remainder - 80;
        words += "quatre-vingt";
        if (unit === 0) words += "s";
        else if (unit === 1) words += "-un";
        else if (unit < 10) words += "-" + units[unit];
        else if (unit < 17) words += "-" + teens[unit - 10];
        else words += "-dix-" + units[unit - 10];
      }
    }

    return words;
  }

  function convertNumber(num) {
    if (num === 0) return "zéro";
    let words = "";

    const billions = Math.floor(num / 1e9);
    num %= 1e9;

    const millions = Math.floor(num / 1e6);
    num %= 1e6;

    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;

    if (billions > 0) words += convertHundreds(billions) + " milliard" + (billions > 1 ? "s " : " ");
    if (millions > 0) words += convertHundreds(millions) + " million" + (millions > 1 ? "s " : " ");
    if (thousands > 0) words += (thousands === 1 ? "mille " : convertHundreds(thousands) + " mille ");
    if (remainder > 0) words += convertHundreds(remainder);

    return words.trim();
  }

  // split integer + decimals
  let [integerPart, decimalPart] = n.toString().split(".");
  let dinars = parseInt(integerPart);

  // read dinars
  let result = convertNumber(dinars) + " dinar" + (dinars > 1 ? "s" : "");

  // millimes (0 → 999)
  if (decimalPart) {
    let mills = decimalPart.padEnd(3, "0").slice(0, 3); // always 3 digits
    let millValue = parseInt(mills);

    if (millValue > 0) {
      result += " " + convertNumber(millValue) + " millime" + (millValue > 1 ? "s" : "");
    }
  }

  return result.trim();
};
