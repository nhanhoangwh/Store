using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if(string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if(string.IsNullOrWhiteSpace(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types)
        {
            var brandList = new List<string>();
            var typeList = new List<string>();

            if(!string.IsNullOrWhiteSpace(brands))
                brandList.AddRange(brands.ToLower().Split(",").ToList());
                
            if(!string.IsNullOrWhiteSpace(types))
                typeList.AddRange(types.ToLower().Split(",").ToList());

            // switch(brandList.Count){
            //     case 1:
            //         query = query.Where(p => p.Brand.ToLower().Contains(brandList.First().ToLower()));
            //         break;
            //     case 0:
            //         break;
            //     default:
            //         query = query.Where(p => brandList.Contains(p.Brand.ToLower()));
            //         break;
            // }

            // switch(typeList.Count){
            //     case 1:
            //         query = query.Where(p => p.Type.ToLower().Contains(typeList.First().ToLower()));
            //         break;
            //     case 0:
            //         break;
            //     default:
            //         query = query.Where(p => typeList.Contains(p.Type.ToLower()));
            //         break;
            // }

            query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
            query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type.ToLower()));
                       
            return query;
        }
    }
}