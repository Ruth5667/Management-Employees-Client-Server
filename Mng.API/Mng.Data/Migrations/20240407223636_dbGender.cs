using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mng.Data.Migrations
{
    /// <inheritdoc />
    public partial class dbGender : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleToEmployee_Role_RoleId",
                table: "RoleToEmployee");

            migrationBuilder.DropIndex(
                name: "IX_RoleToEmployee_RoleId",
                table: "RoleToEmployee");

            migrationBuilder.AlterColumn<int>(
                name: "Gender",
                table: "Employee",
                type: "int",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Gender",
                table: "Employee",
                type: "bit",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_RoleToEmployee_RoleId",
                table: "RoleToEmployee",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleToEmployee_Role_RoleId",
                table: "RoleToEmployee",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
