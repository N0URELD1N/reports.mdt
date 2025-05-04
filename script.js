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






function renderReports() {
    const reportsContainer = document.getElementById("reports-container");
    const reports = JSON.parse(localStorage.getItem("mdtReports")) || [];

    reportsContainer.innerHTML = "";

    if (reports.length === 0) {
        reportsContainer.innerHTML = "<p>لا توجد تقارير حالياً.</p>";
        return;
    }

    // عرض كل تقرير
    reports.forEach((report, index) => {
        const reportDiv = document.createElement("div");
        reportDiv.className = "report";
        reportDiv.innerHTML = `
            <h3>الاسم: ${report.personName}</h3>
            <p>مقدم البلاغ: ${report.reporterName}</p>
            <p>حالة المهمة: ${report.missionStatus}</p>
            <p>نوع الحالة: ${report.caseType}</p>
            <p>الرمز الدولي: ${report.personCode}</p>
            <p>معلومات إضافية: ${report.additionalInfo || "لا يوجد"}</p>
            ${report.image ? `<img src="${report.image}" alt="صورة الشخص" width="100">` : ""}
            <hr>
        `;
        reportsContainer.appendChild(reportDiv);
    });

    // إنشاء زر الحذف
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "حذف جميع التقارير";
    deleteButton.style.marginTop = "20px";
    deleteButton.onclick = function () {
        const pass = prompt("أدخل الرمز السري لحذف التقارير:");
        if (pass === "OTRP_LSPD_S2") {
            localStorage.removeItem("mdtReports");
            alert("تم حذف جميع التقارير.");
            location.reload();
        } else {
            alert("رمز خاطئ. لا يمكن الحذف.");
        }
    };

    reportsContainer.appendChild(deleteButton);
}

// تنفيذ الدالة عند فتح الصفحة
document.addEventListener("DOMContentLoaded", renderReports);
