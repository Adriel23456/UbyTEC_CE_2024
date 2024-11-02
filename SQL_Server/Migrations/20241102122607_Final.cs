using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SQL_Server.Migrations
{
    /// <inheritdoc />
    public partial class Final : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstSurname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecondSurname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false, computedColumnSql: "[Name] + ' ' + [FirstSurname] + ' ' + [SecondSurname]", stored: true),
                    Province = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Canton = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    District = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Direction = table.Column<string>(type: "nvarchar(max)", nullable: false, computedColumnSql: "[Province] + ', ' + [Canton] + ', ' + [District]", stored: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BusinessManager",
                columns: table => new
                {
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstSurname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecondSurname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true, computedColumnSql: "[Name] + ' ' + [FirstSurname] + ' ' + [SecondSurname]", stored: true),
                    Province = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Canton = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    District = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Direction = table.Column<string>(type: "nvarchar(max)", nullable: true, computedColumnSql: "[Province] + ', ' + [Canton] + ', ' + [District]", stored: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessManager", x => x.Email);
                });

            migrationBuilder.CreateTable(
                name: "BusinessType",
                columns: table => new
                {
                    Identification = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessType", x => x.Identification);
                });

            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstSurname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecondSurname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true, computedColumnSql: "[Name] + ' ' + [FirstSurname] + ' ' + [SecondSurname]", stored: true),
                    Province = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Canton = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    District = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Direction = table.Column<string>(type: "nvarchar(max)", nullable: true, computedColumnSql: "[Province] + ', ' + [Canton] + ', ' + [District]", stored: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<int>(type: "int", nullable: false),
                    BirthDate = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FoodDeliveryMan",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstSurname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecondSurname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true, computedColumnSql: "[Name] + ' ' + [FirstSurname] + ' ' + [SecondSurname]", stored: true),
                    Province = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Canton = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    District = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Direction = table.Column<string>(type: "nvarchar(max)", nullable: true, computedColumnSql: "[Province] + ', ' + [Canton] + ', ' + [District]", stored: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodDeliveryMan", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "AdminPhone",
                columns: table => new
                {
                    Admin_id = table.Column<int>(type: "int", nullable: false),
                    Phone = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminPhone", x => new { x.Admin_id, x.Phone });
                    table.ForeignKey(
                        name: "FK_AdminPhone_Admin_Admin_id",
                        column: x => x.Admin_id,
                        principalTable: "Admin",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BusinessManagerPhone",
                columns: table => new
                {
                    BusinessManager_Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Phone = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessManagerPhone", x => new { x.BusinessManager_Email, x.Phone });
                    table.ForeignKey(
                        name: "FK_BusinessManagerPhone_BusinessManager_BusinessManager_Email",
                        column: x => x.BusinessManager_Email,
                        principalTable: "BusinessManager",
                        principalColumn: "Email",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BusinessAssociate",
                columns: table => new
                {
                    Legal_Id = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BusinessName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Direction = table.Column<string>(type: "nvarchar(max)", nullable: true, computedColumnSql: "[Province] + ', ' + [Canton] + ', ' + [District]", stored: true),
                    Province = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Canton = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    District = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SINPE = table.Column<int>(type: "int", nullable: false),
                    RejectReason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BusinessManager_Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BusinessType_Identification = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessAssociate", x => x.Legal_Id);
                    table.ForeignKey(
                        name: "FK_BusinessAssociate_BusinessManager_BusinessManager_Email",
                        column: x => x.BusinessManager_Email,
                        principalTable: "BusinessManager",
                        principalColumn: "Email",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BusinessAssociate_BusinessType_BusinessType_Identification",
                        column: x => x.BusinessType_Identification,
                        principalTable: "BusinessType",
                        principalColumn: "Identification",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Cart",
                columns: table => new
                {
                    Code = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusinessAssociate_Legal_Id = table.Column<int>(type: "int", nullable: true),
                    TotalProductsPrice = table.Column<int>(type: "int", nullable: true),
                    Client_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cart", x => x.Code);
                    table.ForeignKey(
                        name: "FK_Cart_Client_Client_Id",
                        column: x => x.Client_Id,
                        principalTable: "Client",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FoodDeliveryManPhone",
                columns: table => new
                {
                    FoodDeliveryMan_UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Phone = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodDeliveryManPhone", x => new { x.FoodDeliveryMan_UserId, x.Phone });
                    table.ForeignKey(
                        name: "FK_FoodDeliveryManPhone_FoodDeliveryMan_FoodDeliveryMan_UserId",
                        column: x => x.FoodDeliveryMan_UserId,
                        principalTable: "FoodDeliveryMan",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    Code = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalService = table.Column<int>(type: "int", nullable: true),
                    Direction = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Client_Id = table.Column<int>(type: "int", nullable: false),
                    FoodDeliveryMan_UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.Code);
                    table.ForeignKey(
                        name: "FK_Order_Client_Client_Id",
                        column: x => x.Client_Id,
                        principalTable: "Client",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Order_FoodDeliveryMan_FoodDeliveryMan_UserId",
                        column: x => x.FoodDeliveryMan_UserId,
                        principalTable: "FoodDeliveryMan",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "BusinessAssociatePhone",
                columns: table => new
                {
                    BusinessAssociate_Legal_Id = table.Column<int>(type: "int", nullable: false),
                    Phone = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessAssociatePhone", x => new { x.BusinessAssociate_Legal_Id, x.Phone });
                    table.ForeignKey(
                        name: "FK_BusinessAssociatePhone_BusinessAssociate_BusinessAssociate_Legal_Id",
                        column: x => x.BusinessAssociate_Legal_Id,
                        principalTable: "BusinessAssociate",
                        principalColumn: "Legal_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    Code = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BusinessAssociate_Legal_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.Code);
                    table.ForeignKey(
                        name: "FK_Product_BusinessAssociate_BusinessAssociate_Legal_Id",
                        column: x => x.BusinessAssociate_Legal_Id,
                        principalTable: "BusinessAssociate",
                        principalColumn: "Legal_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FeedBack",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FeedBack_Business = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BusinessGrade = table.Column<double>(type: "float", nullable: false),
                    FeedBack_Order = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderGrade = table.Column<double>(type: "float", nullable: false),
                    FeedBack_DeliveryMan = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeliveryManGrade = table.Column<double>(type: "float", nullable: false),
                    FoodDeliveryMan_UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Order_Code = table.Column<int>(type: "int", nullable: false),
                    BusinessAssociate_Legal_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedBack", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeedBack_BusinessAssociate_BusinessAssociate_Legal_Id",
                        column: x => x.BusinessAssociate_Legal_Id,
                        principalTable: "BusinessAssociate",
                        principalColumn: "Legal_Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FeedBack_FoodDeliveryMan_FoodDeliveryMan_UserId",
                        column: x => x.FoodDeliveryMan_UserId,
                        principalTable: "FoodDeliveryMan",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FeedBack_Order_Order_Code",
                        column: x => x.Order_Code,
                        principalTable: "Order",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProofOfPayment",
                columns: table => new
                {
                    Code = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreditCardName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastDigitsCreditCard = table.Column<int>(type: "int", nullable: false),
                    TotalPayment = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Time = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClientFullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClientPhone = table.Column<int>(type: "int", nullable: true),
                    Order_Code = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProofOfPayment", x => x.Code);
                    table.ForeignKey(
                        name: "FK_ProofOfPayment_Order_Order_Code",
                        column: x => x.Order_Code,
                        principalTable: "Order",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Cart_Product",
                columns: table => new
                {
                    Cart_Code = table.Column<int>(type: "int", nullable: false),
                    Product_Code = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cart_Product", x => new { x.Cart_Code, x.Product_Code });
                    table.ForeignKey(
                        name: "FK_Cart_Product_Cart_Cart_Code",
                        column: x => x.Cart_Code,
                        principalTable: "Cart",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cart_Product_Product_Product_Code",
                        column: x => x.Product_Code,
                        principalTable: "Product",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Order_Product",
                columns: table => new
                {
                    Order_Code = table.Column<int>(type: "int", nullable: false),
                    Product_Code = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order_Product", x => new { x.Order_Code, x.Product_Code });
                    table.ForeignKey(
                        name: "FK_Order_Product_Order_Order_Code",
                        column: x => x.Order_Code,
                        principalTable: "Order",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Order_Product_Product_Product_Code",
                        column: x => x.Product_Code,
                        principalTable: "Product",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductPhoto",
                columns: table => new
                {
                    Product_Code = table.Column<int>(type: "int", nullable: false),
                    PhotoURL = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductPhoto", x => new { x.Product_Code, x.PhotoURL });
                    table.ForeignKey(
                        name: "FK_ProductPhoto_Product_Product_Code",
                        column: x => x.Product_Code,
                        principalTable: "Product",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Admin_UserId",
                table: "Admin",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BusinessAssociate_BusinessManager_Email",
                table: "BusinessAssociate",
                column: "BusinessManager_Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BusinessAssociate_BusinessType_Identification",
                table: "BusinessAssociate",
                column: "BusinessType_Identification");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessManager_UserId",
                table: "BusinessManager",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BusinessType_Name",
                table: "BusinessType",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Cart_Client_Id",
                table: "Cart",
                column: "Client_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_Product_Product_Code",
                table: "Cart_Product",
                column: "Product_Code");

            migrationBuilder.CreateIndex(
                name: "IX_Client_UserId",
                table: "Client",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FeedBack_BusinessAssociate_Legal_Id",
                table: "FeedBack",
                column: "BusinessAssociate_Legal_Id");

            migrationBuilder.CreateIndex(
                name: "IX_FeedBack_FoodDeliveryMan_UserId",
                table: "FeedBack",
                column: "FoodDeliveryMan_UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FeedBack_Order_Code",
                table: "FeedBack",
                column: "Order_Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Order_Client_Id",
                table: "Order",
                column: "Client_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Order_FoodDeliveryMan_UserId",
                table: "Order",
                column: "FoodDeliveryMan_UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_Product_Product_Code",
                table: "Order_Product",
                column: "Product_Code");

            migrationBuilder.CreateIndex(
                name: "IX_Product_BusinessAssociate_Legal_Id",
                table: "Product",
                column: "BusinessAssociate_Legal_Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProofOfPayment_Order_Code",
                table: "ProofOfPayment",
                column: "Order_Code",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminPhone");

            migrationBuilder.DropTable(
                name: "BusinessAssociatePhone");

            migrationBuilder.DropTable(
                name: "BusinessManagerPhone");

            migrationBuilder.DropTable(
                name: "Cart_Product");

            migrationBuilder.DropTable(
                name: "FeedBack");

            migrationBuilder.DropTable(
                name: "FoodDeliveryManPhone");

            migrationBuilder.DropTable(
                name: "Order_Product");

            migrationBuilder.DropTable(
                name: "ProductPhoto");

            migrationBuilder.DropTable(
                name: "ProofOfPayment");

            migrationBuilder.DropTable(
                name: "Admin");

            migrationBuilder.DropTable(
                name: "Cart");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "BusinessAssociate");

            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropTable(
                name: "FoodDeliveryMan");

            migrationBuilder.DropTable(
                name: "BusinessManager");

            migrationBuilder.DropTable(
                name: "BusinessType");
        }
    }
}
