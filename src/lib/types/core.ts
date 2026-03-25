type CoreWeapon = {
	id: string;
	name: string;
	description: string;
	tags?: string[];
};

type CoreArmor = {
	id: string;
	name: string;
	description: string;
	tags?: string[];
};

type CoreSystemFeature = {
	id: string;
	name: string;
	description: string;
	tags?: string[];
};

export type CoreSchematic = {
	id: string;
	name: string;
	model?: string;
	manufacturer?: string;
	description?: string;
	image?: string;
	role?: string;
	tags?: string[];

	weapons: CoreWeapon[];
	armor: CoreArmor[];
	systems: CoreSystemFeature[];
};
