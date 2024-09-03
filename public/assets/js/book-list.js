$(document).ready(function () {
    $(".delete-book").on("click", function (e) {
      e.preventDefault();
  
      if (confirm("Estás seguro de eliminar este libro?")) {
        $(this).closest(".form-delete").submit();
      }
    });
  });
  