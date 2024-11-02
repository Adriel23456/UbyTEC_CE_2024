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
                .ReverseMap();
            
            CreateMap<Client, ClientDTO_Create>()
                .ReverseMap();

            CreateMap<Client, ClientDTO_Update>()
                .ReverseMap();

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
        }
    }
}