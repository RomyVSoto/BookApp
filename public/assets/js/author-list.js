$(document).ready(function () {
    $(".delete-author").on("click", function (e) {
      e.preventDefault();
  
      if (confirm("Estás seguro de eliminar este autor?")) {
        $(this).closest(".form-delete").submit();
      }
    });
  });
  