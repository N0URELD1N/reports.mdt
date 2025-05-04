function toggleCustomType() {
  const caseType = document.getElementById("caseType").value;
  const customField = document.getElementById("customCaseType");
  customField.style.display = (caseType === "آخر") ? "block" : "none";
}

function submitReport() {
  const reporterName = document.getElementById("reporterName").value.trim();



  const missionStatus = document.getElementById("missionStatus").value;
  const caseType = document.getElementById("caseType").value;
  const customType = document.getElementById("customCaseType").value.trim();
  const personName = document.getElementById("personName").value.trim();
  const additionalInfo = document.getElementById("additionalInfo").value.trim();
  const imageInput = document.getElementById("personImage");
  const timestamp = new Date().toLocaleString('ar-EG', { hour12: false });

  const reader = new FileReader();
  reader.onload = function () {
    const imageData = reader.result;

    const finalCaseType = (caseType === "آخر") ? customType : caseType;

    const report = {
      reporterName,
      missionStatus,
      caseType: finalCaseType,
      personName,
      additionalInfo,
      imageData,
      timestamp
    };

    const reports = JSON.parse(localStorage.getItem("mdtReports") || "[]");
    reports.unshift(report);
    localStorage.setItem("mdtReports", JSON.stringify(reports));

    document.getElementById("confirmation").textContent = "تم إرسال التقرير بنجاح!";
  };

  if (imageInput.files.length > 0) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    // No image provided
    const report = {
      reporterName,
      missionStatus,
      caseType: (caseType === "آخر") ? customType : caseType,
      personName,
      additionalInfo,
      imageData: null,
      timestamp
    };

    const reports = JSON.parse(localStorage.getItem("mdtReports") || "[]");
    reports.unshift(report);
    localStorage.setItem("mdtReports", JSON.stringify(reports));

    document.getElementById("confirmation").textContent = "تم إرسال التقرير بنجاح!";
  }
}
