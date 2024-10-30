using AutoMapper;
using SQL_Server.Models;
using SQL_Server.DTOs;

namespace SQL_Server.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Mapeo bidireccional de Admin a AdminDTO y viceversa
            CreateMap<Admin, AdminDTO>()
                .ReverseMap()
                .ForMember(dest => dest.AdminPhones, opt => opt.Ignore()); // Ignora propiedades de navegación al mapear de DTO a Entity
            
            // Mapeo bidireccional de Admin a AdminDTO_Update y viceversa
            CreateMap<Admin, AdminDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.AdminPhones, opt => opt.Ignore()); // Ignora propiedades de navegación al mapear de DTO a Entity
            
            // Mapeo bidireccional de Admin a AdminDTO_Update y viceversa
            CreateMap<Admin, AdminDTO_Create>()
                .ReverseMap()
                .ForMember(dest => dest.AdminPhones, opt => opt.Ignore()); // Ignora propiedades de navegación al mapear de DTO a Entity

            // Mapeo bidireccional de AdminPhone a AdminPhoneDTO y viceversa
            CreateMap<AdminPhone, AdminPhoneDTO>()
                .ReverseMap()
                .ForMember(dest => dest.Admin, opt => opt.Ignore()); // Ignora propiedades de navegación al mapear de DTO a Entity

            // Mapeo bidireccional de AdminPhone a AdminPhoneDTO_Update y viceversa
            CreateMap<AdminPhone, AdminPhoneDTO_Update>()
                .ReverseMap()
                .ForMember(dest => dest.Admin, opt => opt.Ignore()); // Ignora propiedades de navegación al mapear de DTO a Entity
        }
    }
}