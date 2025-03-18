using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PCGalaxy.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b0bc4228-a7cf-4912-89e8-f92b4624b4db");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c452fab4-c632-4271-80fd-53af27e7b341");

            migrationBuilder.AddColumn<byte[]>(
                name: "SpecificationsFile",
                table: "Products",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "470cc408-f4b4-4967-ab4f-22e9fbafd67c", null, "user", "user" },
                    { "ca4176fc-f118-4fe7-a2f3-46d75a3616f8", null, "admin", "admin" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "470cc408-f4b4-4967-ab4f-22e9fbafd67c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ca4176fc-f118-4fe7-a2f3-46d75a3616f8");

            migrationBuilder.DropColumn(
                name: "SpecificationsFile",
                table: "Products");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b0bc4228-a7cf-4912-89e8-f92b4624b4db", null, "user", "user" },
                    { "c452fab4-c632-4271-80fd-53af27e7b341", null, "admin", "admin" }
                });
        }
    }
}
