using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mng.Data.Migrations
{
    /// <inheritdoc />
    public partial class withoutemployeeId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleToEmployee_Employee_EmployeeId",
                table: "RoleToEmployee");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "RoleToEmployee",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleToEmployee_Employee_EmployeeId",
                table: "RoleToEmployee",
                column: "EmployeeId",
                principalTable: "Employee",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleToEmployee_Employee_EmployeeId",
                table: "RoleToEmployee");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "RoleToEmployee",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RoleToEmployee_Employee_EmployeeId",
                table: "RoleToEmployee",
                column: "EmployeeId",
                principalTable: "Employee",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
