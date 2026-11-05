export interface Category {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	position: number;
	isActive: boolean;
}

export interface ProductSummary {
	id: string;
	name: string;
	slug: string;
	category?: Category;
	basePriceMinor: number;
	currency: string;
	coverImageUrl: string | null;
	productionMethod: "dtg" | "dtf" | "sublimation";
	fabricType: string | null;
	isActive: boolean;
}

export interface ProductVariant {
	id: string;
	sku: string;
	colorName: string;
	colorHex: string;
	size: string;
	priceDeltaMinor: number;
	stockQuantity: number;
	mockupUrl: string | null;
	isActive: boolean;
}

export interface PrintArea {
	id: string;
	name: string;
	widthMm: number;
	heightMm: number;
	offsetXMm: number;
	offsetYMm: number;
	mockupPxPerMm: number;
	minDpi: number;
}

export interface DiscountTier {
	id: string;
	minQuantity: number;
	discountPercent: number;
	isActive: boolean;
}

export interface Product extends ProductSummary {
	description: string | null;
	isCustomizable: boolean;
	images: { id: string; url: string; alt: string | null; position: number }[];
	variants: ProductVariant[];
	printAreas: PrintArea[];
	discountTiers: DiscountTier[];
}

export interface ProductList {
	items: ProductSummary[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}

export interface CategoryList {
	items: Category[];
}

export interface User {
	id: string;
	email: string;
	fullName: string;
	phone: string | null;
	role: "customer" | "moderator" | "admin" | "super_admin";
	status: "active" | "blocked" | "deleted";
	locale: "uk" | "en";
	avatarUrl: string | null;
	permissions: string[];
	createdAt: string;
}

export interface LoginResponse {
	accessToken: string;
	tokenType: string;
	expiresIn: number;
	user: User;
	permissions: string[];
}
