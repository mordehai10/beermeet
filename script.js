function doGet() {
  // ... (Your existing doGet() function to handle simple "Hello, World!")

}

function doPost(e) {
  // Get data from the request
  const postData = JSON.parse(e.postData.contents); 
  const dates = postData.dates; 
  const submitterName = postData.name; 

  // Get the active spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("beermeet"); 

  // Find the last row with data
  let lastRow = sheet.getLastRow(); 

  // Append data to the sheet
  for (const date of dates) {
    lastRow++;
    sheet.getRange(lastRow, 1).setValue(date); 
    sheet.getRange(lastRow, 2).setValue(submitterName); 
  }

  // Return a success message (optional)
  return ContentService.createTextOutput("Data submitted successfully!");
}
