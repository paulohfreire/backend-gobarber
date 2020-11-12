import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterProviderFieldToProviderId1605124599996 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Para deletar a coluna em appointments o elemento provider
        await queryRunner.dropColumn('appointments', 'provider');
        // para substituir o provider pelo id
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider_id',
            type: 'uuid',
            isNullable: true,

        }),
        );
        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn('appointments', new TableColumn ({
            name: 'provider', 
            type: 'varchar',
        }),);
    }

}
