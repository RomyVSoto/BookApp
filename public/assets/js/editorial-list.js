$(document).ready(function () {
    $(".delete-editorial").on("click", function (e) {
      e.preventDefault();
  
      if (confirm("Estás seguro de eliminar esta editorial?")) {
        $(this).closest(".form-delete").submit();
      }
    });
  });
  