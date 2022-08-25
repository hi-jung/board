import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("TB_REPLY", { schema: "service" })
export class TbReply {
  @PrimaryGeneratedColumn({ type: "bigint", name: "TR_ID", unsigned: true })
  trId: string;

  @Column("bigint", { name: "TB_ID", unsigned: true })
  tbId: string;

  @Column("varchar", { name: "TR_CONTENT", nullable: true, length: 500 })
  trContent: string | null;

  @Column("varchar", { name: "TR_USERNAME", length: 20 })
  trUsername: string;

  @Column("datetime", { name: "TR_REGIST_DATE", nullable: true })
  trRegistDate: Date | null;

  @Column("int", { name: "TR_DEPTH", nullable: true, default: () => "'0'" })
  trDepth: number | null;

  @Column("bigint", { name: "TR_PARENT_ID", nullable: true, unsigned: true })
  trParentId: string | null;
}
