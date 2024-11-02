using AutoMapper;
using SQL_Server.Models;
using SQL_Server.DTOs;

namespace SQL_Server.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Admin mappings
            CreateMap<Admin, AdminDTO>()
                .ReverseMap()
                .ForMember(dest => dest.AdminPhones, opt => opt.Ignore());
            
            CreateMap<Admin, AdminDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.AdminPhones, opt => opt.Ignore());
            
            CreateMap<Admin, AdminDTO_Create>()
                .ReverseMap()
                .ForMember(dest => dest.AdminPhones, opt => opt.Ignore());

            // AdminPhone mappings
            CreateMap<AdminPhone, AdminPhoneDTO>()
                .ReverseMap()
                .ForMember(dest => dest.Admin, opt => opt.Ignore());

            CreateMap<AdminPhone, AdminPhoneDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.Admin, opt => opt.Ignore());
            
            // BusinessManager mappings
            CreateMap<BusinessManager, BusinessManagerDTO>()
                .ReverseMap()
                .ForMember(dest => dest.BusinessManagerPhones, opt => opt.Ignore());

            CreateMap<BusinessManager, BusinessManagerDTO_Create>()
                .ReverseMap()
                .ForMember(dest => dest.BusinessManagerPhones, opt => opt.Ignore());

            CreateMap<BusinessManager, BusinessManagerDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.BusinessManagerPhones, opt => opt.Ignore());

            // BusinessManagerPhone mappings
            CreateMap<BusinessManagerPhone, BusinessManagerPhoneDTO>()
                .ReverseMap()
                .ForMember(dest => dest.BusinessManager, opt => opt.Ignore());

            CreateMap<BusinessManagerPhone, BusinessManagerPhoneDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.BusinessManager, opt => opt.Ignore());
            
            // FoodDeliveryMan mappings
            CreateMap<FoodDeliveryMan, FoodDeliveryManDTO>()
                .ReverseMap()
                .ForMember(dest => dest.FoodDeliveryManPhones, opt => opt.Ignore());

            CreateMap<FoodDeliveryMan, FoodDeliveryManDTO_Create>()
                .ReverseMap()
                .ForMember(dest => dest.FoodDeliveryManPhones, opt => opt.Ignore());

            CreateMap<FoodDeliveryMan, FoodDeliveryManDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.FoodDeliveryManPhones, opt => opt.Ignore());

            // FoodDeliveryManPhone mappings
            CreateMap<FoodDeliveryManPhone, FoodDeliveryManPhoneDTO>()
                .ReverseMap()
                .ForMember(dest => dest.FoodDeliveryMan, opt => opt.Ignore());

            CreateMap<FoodDeliveryManPhone, FoodDeliveryManPhoneDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.FoodDeliveryMan, opt => opt.Ignore());
            
            // Client mappings
            CreateMap<Client, ClientDTO>()
                .ReverseMap()
                .ForMember(dest => dest.Carts, opt => opt.Ignore());
            
            CreateMap<Client, ClientDTO_Create>()
                .ReverseMap()
                .ForMember(dest => dest.Carts, opt => opt.Ignore());

            CreateMap<Client, ClientDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.Carts, opt => opt.Ignore());

            // BusinessType mappings
            CreateMap<BusinessType, BusinessTypeDTO>()
                .ReverseMap();
            
            CreateMap<BusinessType, BusinessTypeDTO_Create>()
                .ReverseMap();
            
            CreateMap<BusinessType, BusinessTypeDTO_Update>()
                .ReverseMap();
            
            // BusinessAssociate mappings
            CreateMap<BusinessAssociate, BusinessAssociateDTO>()
                .ReverseMap()
                .ForMember(dest => dest.BusinessAssociatePhones, opt => opt.Ignore());

            CreateMap<BusinessAssociate, BusinessAssociateDTO_Create>()
                .ReverseMap()
                .ForMember(dest => dest.BusinessAssociatePhones, opt => opt.Ignore())
                .ForMember(dest => dest.Direction, opt => opt.Ignore())
                .ForMember(dest => dest.RejectReason, opt => opt.Ignore());

            CreateMap<BusinessAssociate, BusinessAssociateDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.BusinessAssociatePhones, opt => opt.Ignore())
                .ForMember(dest => dest.Legal_Id, opt => opt.Ignore())
                .ForMember(dest => dest.Direction, opt => opt.Ignore());

            // BusinessAssociatePhone mappings
            CreateMap<BusinessAssociatePhone, BusinessAssociatePhoneDTO>()
                .ReverseMap()
                .ForMember(dest => dest.BusinessAssociate, opt => opt.Ignore());

            CreateMap<BusinessAssociatePhone, BusinessAssociatePhoneDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.BusinessAssociate, opt => opt.Ignore())
                .ForMember(dest => dest.BusinessAssociate_Legal_Id, opt => opt.Ignore());
            
            // Product mappings
            CreateMap<Product, ProductDTO>()
                .ReverseMap()
                .ForMember(dest => dest.ProductPhotos, opt => opt.Ignore());

            CreateMap<Product, ProductDTO_Create>()
                .ReverseMap()
                .ForMember(dest => dest.ProductPhotos, opt => opt.Ignore())
                .ForMember(dest => dest.Code, opt => opt.Ignore()); // Code is auto-generated

            CreateMap<Product, ProductDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.ProductPhotos, opt => opt.Ignore())
                .ForMember(dest => dest.Code, opt => opt.Ignore());

            // ProductPhoto mappings
            CreateMap<ProductPhoto, ProductPhotoDTO>()
                .ReverseMap()
                .ForMember(dest => dest.Product, opt => opt.Ignore());

            CreateMap<ProductPhoto, ProductPhotoDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.Product, opt => opt.Ignore())
                .ForMember(dest => dest.Product_Code, opt => opt.Ignore());
            
            // Cart mappings
            CreateMap<Cart, CartDTO>()
                .ReverseMap()
                .ForMember(dest => dest.Cart_Products, opt => opt.Ignore());

            CreateMap<Cart, CartDTO_Create>()
                .ReverseMap()
                .ForMember(dest => dest.Cart_Products, opt => opt.Ignore())
                .ForMember(dest => dest.Code, opt => opt.Ignore()) // Code is auto-generated
                .ForMember(dest => dest.BusinessAssociate_Legal_Id, opt => opt.Ignore())
                .ForMember(dest => dest.TotalProductsPrice, opt => opt.Ignore());

            CreateMap<Cart, CartDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.Cart_Products, opt => opt.Ignore())
                .ForMember(dest => dest.Code, opt => opt.Ignore())
                .ForMember(dest => dest.BusinessAssociate_Legal_Id, opt => opt.Ignore())
                .ForMember(dest => dest.TotalProductsPrice, opt => opt.Ignore());

            // Cart_Product mappings
            CreateMap<Cart_Product, Cart_ProductDTO>()
                .ReverseMap()
                .ForMember(dest => dest.Cart, opt => opt.Ignore())
                .ForMember(dest => dest.Product, opt => opt.Ignore());

            CreateMap<Cart_Product, Cart_ProductDTO_Create>()
                .ReverseMap()
                .ForMember(dest => dest.Cart, opt => opt.Ignore())
                .ForMember(dest => dest.Product, opt => opt.Ignore())
                .ForMember(dest => dest.Amount, opt => opt.Ignore()); // Amount is assigned automatically

            CreateMap<Cart_Product, Cart_ProductDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.Cart, opt => opt.Ignore())
                .ForMember(dest => dest.Product, opt => opt.Ignore())
                .ForMember(dest => dest.Cart_Code, opt => opt.Ignore())
                .ForMember(dest => dest.Product_Code, opt => opt.Ignore());
            
            // Order mappings
            CreateMap<Order, OrderDTO>()
                .ReverseMap()
                .ForMember(dest => dest.Order_Products, opt => opt.Ignore());

            CreateMap<Order, OrderDTO_Create>()
                .ReverseMap()
                .ForMember(dest => dest.Order_Products, opt => opt.Ignore())
                .ForMember(dest => dest.Code, opt => opt.Ignore()) // Code is auto-generated
                .ForMember(dest => dest.TotalService, opt => opt.Ignore())
                .ForMember(dest => dest.Direction, opt => opt.Ignore());

            CreateMap<Order, OrderDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.Order_Products, opt => opt.Ignore())
                .ForMember(dest => dest.Code, opt => opt.Ignore())
                .ForMember(dest => dest.TotalService, opt => opt.Ignore())
                .ForMember(dest => dest.Direction, opt => opt.Ignore());

            // Order_Product mappings
            CreateMap<Order_Product, Order_ProductDTO>()
                .ReverseMap()
                .ForMember(dest => dest.Order, opt => opt.Ignore())
                .ForMember(dest => dest.Product, opt => opt.Ignore());

            CreateMap<Order_Product, Order_ProductDTO_Create>()
                .ReverseMap()
                .ForMember(dest => dest.Order, opt => opt.Ignore())
                .ForMember(dest => dest.Product, opt => opt.Ignore())
                .ForMember(dest => dest.Amount, opt => opt.Ignore()); // Amount is assigned automatically

            CreateMap<Order_Product, Order_ProductDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.Order, opt => opt.Ignore())
                .ForMember(dest => dest.Product, opt => opt.Ignore())
                .ForMember(dest => dest.Order_Code, opt => opt.Ignore())
                .ForMember(dest => dest.Product_Code, opt => opt.Ignore());
        }
    }
}