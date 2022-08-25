import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("TB_BOARD", { schema: "service" })
export class TbBoard {
  @PrimaryGeneratedColumn({ type: "bigint", name: "TB_ID", unsigned: true })
  tbId: string;

  @Column("varchar", { name: "TB_TITLE", length: 200 })
  tbTitle: string;

  @Column("text", { name: "TB_CONTENT", nullable: true })
  tbContent: string | null;

  @Column("varchar", { name: "TB_USERNAME", length: 20 })
  tbUsername: string;

  @Column("datetime", { name: "TB_REGIST_DATE", nullable: true })
  tbRegistDate: Date | null;

  @Column("datetime", { name: "TB_UPDATE_DATE", nullable: true })
  tbUpdateDate: Date | null;

  @Column("varchar", { name: "TB_PASSWORD", length: 100 })
  tbPassword: string;
}
