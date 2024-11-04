namespace SQL_Server.DTOs
{
    public class FeedBackDTO_Create
    {
        public required string FeedBack_Business { get; set; }
        public required double BusinessGrade { get; set; } // Between 0-5
        public required string FeedBack_Order { get; set; }
        public required double OrderGrade { get; set; } // Between 0-5
        public required string FeedBack_DeliveryMan { get; set; }
        public required double DeliveryManGrade { get; set; } // Between 0-5
        public required string FoodDeliveryMan_UserId { get; set; } // FK
        public required long Order_Code { get; set; } // FK
        public required long BusinessAssociate_Legal_Id { get; set; } // FK
    }
}