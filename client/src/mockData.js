// Mock user data
export const mockUser = {
  id: 1,
  fname: "Demo User",
  lname: "Test",
  email: "demo@example.com",
  zip_code: "10100",
  profile_image: "/svg/profile.svg"
};

// Mock food items
export const mockFoodItems = [
  {
    id: 1,
    material: "ข้าว",
    type: 1,
    exp: "2030-04-01",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000",
    address: "กรุงเทพมหานคร",
    user: {
      id: 1,
      fname: "Demo User",
      profile_image: "/svg/profile.svg"
    }
  },
  {
    id: 2,
    material: "ผักบุ้ง",
    type: 2,
    exp: "2030-03-25",
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1000",
    address: "กรุงเทพมหานคร",
    user: {
      id: 1,
      fname: "Demo User",
      profile_image: "/svg/profile.svg"
    }
  },
  {
    id: 3,
    material: "ขนมปัง",
    type: 3,
    exp: "2030-03-20",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000",
    address: "กรุงเทพมหานคร",
    user: {
      id: 1,
      fname: "Demo User",
      profile_image: "/svg/profile.svg"
    }
  }
];

// Mock fridge items
export const mockFridgeItems = [
  {
    id: 1,
    material: "ข้าว",
    exp: "2030-04-01",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000",
    is_store: 0
  },
  {
    id: 2,
    material: "ผักบุ้ง",
    exp: "2030-03-25",
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1000",
    is_store: 0
  },
  {
    id: 3,
    material: "ขนมปัง",
    exp: "2030-03-20",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000",
    is_store: 1
  },
  {
    id: 4,
    material: "ไข่",
    exp: "2030-03-15",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e2e8f?q=80&w=1000",
    is_store: 0
  }
];

// Mock recipes
export const mockRecipes = [
  {
    title: "ข้าวผัดกุ้ง",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1000",
    instructions: "1. ผัดกระเทียมให้หอม\n2. ใส่กุ้งลงผัด\n3. ใส่ข้าวลงผัด\n4. ปรุงรสด้วยน้ำปลาและพริกไทย",
    sourceUrl: "#",
    ingredients: ["ข้าว", "กุ้ง", "กระเทียม", "น้ำปลา", "พริกไทย"],
    readyInMinutes: 20,
    servings: 2
  },
  {
    title: "ผัดผักบุ้งไฟแดง",
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1000",
    instructions: "1. ตั้งกระทะให้ร้อน\n2. ใส่กระเทียมและพริกแดง\n3. ใส่ผักบุ้งลงผัด\n4. ปรุงรสด้วยน้ำปลา",
    sourceUrl: "#",
    ingredients: ["ผักบุ้ง", "กระเทียม", "พริกแดง", "น้ำปลา"],
    readyInMinutes: 15,
    servings: 2
  }
];

// Mock post data for Inpost page
export const mockPosts = [
  {
    id: 1,
    material: "ข้าวสาร",
    exp: "2030-04-01",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000",
    owner: 1,
    fname: "Demo User",
    lname: "Test",
    pic: "/svg/profile.svg",
    address: "123 ถนนสุขุมวิท",
    subdistrict: "คลองเตย",
    district: "วัฒนา",
    province: "กรุงเทพมหานคร",
    zip_code: "10110",
    ig: "demouser",
    line: "@demouser"
  },
  {
    id: 2,
    material: "ผักบุ้ง",
    exp: "2030-03-25",
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1000",
    owner: 2,
    fname: "สมชาย",
    lname: "รักดี",
    pic: "/svg/profile.svg",
    address: "456 ถนนเพชรบุรี",
    subdistrict: "ทุ่งพญาไท",
    district: "ราชเทวี",
    province: "กรุงเทพมหานคร",
    zip_code: "10400",
    ig: "somchai",
    line: "@somchai"
  },
  {
    id: 3,
    material: "ขนมปัง",
    exp: "2030-03-20",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000",
    owner: 3,
    fname: "สมหญิง",
    lname: "ใจดี",
    pic: "/svg/profile.svg",
    address: "789 ถนนพระราม 9",
    subdistrict: "ห้วยขวาง",
    district: "ห้วยขวาง",
    province: "กรุงเทพมหานคร",
    zip_code: "10310",
    ig: "somying",
    line: "@somying"
  },
  {
    id: 4,
    material: "ไข่ไก่",
    exp: "2030-03-15",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e2e8f?q=80&w=1000",
    owner: 4,
    fname: "วิชัย",
    lname: "สุขใจ",
    pic: "/svg/profile.svg",
    address: "321 ถนนลาดพร้าว",
    subdistrict: "จอมพล",
    district: "จตุจักร",
    province: "กรุงเทพมหานคร",
    zip_code: "10900",
    ig: "wichai",
    line: "@wichai"
  },
  {
    id: 5,
    material: "นมสด",
    exp: "2030-03-10",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1000",
    owner: 5,
    fname: "นภา",
    lname: "รักเรียน",
    pic: "/svg/profile.svg",
    address: "654 ถนนรัชดาภิเษก",
    subdistrict: "ดินแดง",
    district: "ดินแดง",
    province: "กรุงเทพมหานคร",
    zip_code: "10400",
    ig: "napa",
    line: "@napa"
  }
]; 